const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan('combined'));

// Database connection (PostgreSQL/RDS)
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'attendance_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('✓ Database connected successfully');
    release();
  }
});

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'healthy',
      timestamp: new Date(),
      database: 'connected',
      dbTime: result.rows[0].now
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Cloud Attendance System API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      students: '/api/students',
      attendance: '/api/attendance',
      records: '/api/attendance/records'
    }
  });
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, student_id, created_at FROM students ORDER BY name'
    );
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students',
      message: error.message
    });
  }
});

// Add new student
app.post('/api/students', async (req, res) => {
  const { name, email, student_id } = req.body;
  
  if (!name || !email || !student_id) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, email, student_id'
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, student_id) VALUES ($1, $2, $3) RETURNING *',
      [name, email, student_id]
    );
    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding student:', error);
    if (error.code === '23505') { // Unique violation
      res.status(409).json({
        success: false,
        error: 'Student with this email or ID already exists'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to add student',
        message: error.message
      });
    }
  }
});

// Mark attendance
app.post('/api/attendance', async (req, res) => {
  const { student_id, status, date, notes } = req.body;
  
  if (!student_id || !status) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: student_id, status'
    });
  }

  const attendanceDate = date || new Date().toISOString().split('T')[0];

  try {
    // Check if student exists
    const studentCheck = await pool.query(
      'SELECT id FROM students WHERE student_id = $1',
      [student_id]
    );

    if (studentCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }

    // Insert or update attendance
    const result = await pool.query(
      `INSERT INTO attendance (student_id, date, status, notes) 
       VALUES ((SELECT id FROM students WHERE student_id = $1), $2, $3, $4)
       ON CONFLICT (student_id, date) 
       DO UPDATE SET status = $3, notes = $4, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [student_id, attendanceDate, status, notes]
    );

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark attendance',
      message: error.message
    });
  }
});

// Get attendance records
app.get('/api/attendance/records', async (req, res) => {
  const { student_id, start_date, end_date, status } = req.query;
  
  try {
    let query = `
      SELECT a.id, s.name, s.email, s.student_id, a.date, a.status, a.notes, a.created_at
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (student_id) {
      query += ` AND s.student_id = $${paramIndex}`;
      params.push(student_id);
      paramIndex++;
    }

    if (start_date) {
      query += ` AND a.date >= $${paramIndex}`;
      params.push(start_date);
      paramIndex++;
    }

    if (end_date) {
      query += ` AND a.date <= $${paramIndex}`;
      params.push(end_date);
      paramIndex++;
    }

    if (status) {
      query += ` AND a.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ' ORDER BY a.date DESC, s.name';

    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      count: result.rows.length,
      filters: { student_id, start_date, end_date, status },
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch attendance records',
      message: error.message
    });
  }
});

// Get attendance statistics
app.get('/api/attendance/stats', async (req, res) => {
  const { student_id, start_date, end_date } = req.query;
  
  try {
    let query = `
      SELECT 
        s.student_id,
        s.name,
        COUNT(*) FILTER (WHERE a.status = 'present') as present_count,
        COUNT(*) FILTER (WHERE a.status = 'absent') as absent_count,
        COUNT(*) FILTER (WHERE a.status = 'late') as late_count,
        COUNT(*) as total_records,
        ROUND(COUNT(*) FILTER (WHERE a.status = 'present')::numeric / NULLIF(COUNT(*), 0) * 100, 2) as attendance_percentage
      FROM students s
      LEFT JOIN attendance a ON s.id = a.student_id
      WHERE 1=1
    `;
    const params = [];
    let paramIndex = 1;

    if (student_id) {
      query += ` AND s.student_id = $${paramIndex}`;
      params.push(student_id);
      paramIndex++;
    }

    if (start_date) {
      query += ` AND a.date >= $${paramIndex}`;
      params.push(start_date);
      paramIndex++;
    }

    if (end_date) {
      query += ` AND a.date <= $${paramIndex}`;
      params.push(end_date);
      paramIndex++;
    }

    query += ' GROUP BY s.student_id, s.name ORDER BY s.name';

    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching attendance statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch attendance statistics',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  pool.end(() => {
    console.log('Database pool has ended');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = app;
