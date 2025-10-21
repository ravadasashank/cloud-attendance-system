import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Form states
  const [newStudent, setNewStudent] = useState({ name: '', email: '', student_id: '' });
  const [attendanceForm, setAttendanceForm] = useState({ student_id: '', status: 'present', date: '', notes: '' });
  const [filterDate, setFilterDate] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/students`);
      const data = await response.json();
      if (data.success) {
        setStudents(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch attendance records
  const fetchAttendanceRecords = async (date = '') => {
    try {
      setLoading(true);
      const url = date 
        ? `${API_BASE_URL}/api/attendance/records?start_date=${date}&end_date=${date}`
        : `${API_BASE_URL}/api/attendance/records`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setAttendanceRecords(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to fetch attendance records: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new student
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      });
      const data = await response.json();
      if (data.success) {
        setNewStudent({ name: '', email: '', student_id: '' });
        fetchStudents();
        alert('Student added successfully!');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to add student: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Mark attendance
  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceForm)
      });
      const data = await response.json();
      if (data.success) {
        setAttendanceForm({ student_id: '', status: 'present', date: '', notes: '' });
        fetchAttendanceRecords(filterDate);
        alert('Attendance marked successfully!');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to mark attendance: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendanceRecords();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>☁️ Cloud Attendance System</h1>
        <p>Attendance Tracking Made Simple</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={activeTab === 'students' ? 'active' : ''} 
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button 
          className={activeTab === 'attendance' ? 'active' : ''} 
          onClick={() => setActiveTab('attendance')}
        >
          Mark Attendance
        </button>
        <button 
          className={activeTab === 'records' ? 'active' : ''} 
          onClick={() => setActiveTab('records')}
        >
          View Records
        </button>
      </nav>

      <main className="container">
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Welcome to Cloud Attendance System</h2>
            <p>Track attendance efficiently with our cloud-based solution.</p>
            <div className="stats">
              <div className="stat-card">
                <h3>{students.length}</h3>
                <p>Total Students</p>
              </div>
              <div className="stat-card">
                <h3>{attendanceRecords.length}</h3>
                <p>Attendance Records</p>
              </div>
              <div className="stat-card">
                <h3>{attendanceRecords.filter(r => r.status === 'present').length}</h3>
                <p>Present Today</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-section">
            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent} className="form">
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Student ID"
                value={newStudent.student_id}
                onChange={(e) => setNewStudent({...newStudent, student_id: e.target.value})}
                required
              />
              <button type="submit" disabled={loading}>Add Student</button>
            </form>

            <h2>Student List</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.student_id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{new Date(student.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="attendance-section">
            <h2>Mark Attendance</h2>
            <form onSubmit={handleMarkAttendance} className="form">
              <select
                value={attendanceForm.student_id}
                onChange={(e) => setAttendanceForm({...attendanceForm, student_id: e.target.value})}
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.student_id}>
                    {student.name} ({student.student_id})
                  </option>
                ))}
              </select>
              <select
                value={attendanceForm.status}
                onChange={(e) => setAttendanceForm({...attendanceForm, status: e.target.value})}
                required
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
              </select>
              <input
                type="date"
                value={attendanceForm.date}
                onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})}
                placeholder="Date (optional, defaults to today)"
              />
              <textarea
                placeholder="Notes (optional)"
                value={attendanceForm.notes}
                onChange={(e) => setAttendanceForm({...attendanceForm, notes: e.target.value})}
                rows="3"
              />
              <button type="submit" disabled={loading}>Mark Attendance</button>
            </form>
          </div>
        )}

        {activeTab === 'records' && (
          <div className="records-section">
            <h2>Attendance Records</h2>
            <div className="filter">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => {
                  setFilterDate(e.target.value);
                  fetchAttendanceRecords(e.target.value);
                }}
                placeholder="Filter by date"
              />
              <button onClick={() => { setFilterDate(''); fetchAttendanceRecords(); }}>
                Clear Filter
              </button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map(record => (
                    <tr key={record.id}>
                      <td>{new Date(record.date).toLocaleDateString()}</td>
                      <td>{record.student_id}</td>
                      <td>{record.name}</td>
                      <td>
                        <span className={`status-badge status-${record.status}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Cloud Attendance System. Built with React & AWS.</p>
      </footer>
    </div>
  );
}

export default App;
