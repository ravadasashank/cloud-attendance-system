# Cloud-Based Attendance Tracking System

A modern, scalable attendance management solution built with Node.js, React, PostgreSQL, AWS, and Terraform.

## Overview

The Cloud-Based Attendance Tracking System is a comprehensive full-stack application designed for efficient attendance management. This project showcases cloud-native architecture with infrastructure as code, providing a production-ready foundation for scalable attendance tracking.

## Features

- ✅ **Real-time Attendance Tracking** - Capture and monitor attendance in real-time
- ☁️ **Cloud-Based Data Storage** - Secure PostgreSQL database hosted on AWS
- 🚀 **Scalable Architecture** - Built to handle growing user demands
- 🛠️ **Infrastructure as Code** - Automated AWS infrastructure deployment with Terraform
- 🔌 **RESTful API Design** - Clean, well-documented API endpoints
- 💻 **Modern Responsive UI** - React-based frontend with intuitive user experience
- 🔐 **Secure Authentication** - User authentication and authorization
- 📊 **Analytics Dashboard** - Visual insights into attendance patterns

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: React
- **Database**: PostgreSQL
- **Cloud Platform**: AWS (EC2, RDS, VPC, Security Groups)
- **Infrastructure as Code**: Terraform

## Project Structure

```
cloud-attendance-system/
├── backend/           # Node.js backend application
│   ├── server.js      # Express server with API endpoints
│   └── package.json   # Backend dependencies
├── frontend/          # React frontend application
│   ├── src/           # React components and application code
│   └── package.json   # Frontend dependencies
├── infra/             # Terraform infrastructure scripts
│   └── main.tf        # AWS infrastructure definitions
└── docs/              # Project documentation
    └── requirements.md # Functional and non-functional requirements
```

## Prerequisites

Before deploying this application, ensure you have:

- **Node.js** (v14 or higher) and npm installed
- **PostgreSQL** (v12 or higher) installed locally or access to a database instance
- **AWS Account** with appropriate permissions for EC2, RDS, VPC, and Security Groups
- **Terraform** (v1.0 or higher) installed
- **AWS CLI** configured with your credentials
- **Git** for version control

## How to Deploy

### Option 1: Local Development Setup

#### Step 1: Clone the Repository

```bash
git clone https://github.com/ravadasashank/cloud-attendance-system.git
cd cloud-attendance-system
```

#### Step 2: Set Up the Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file with your database configuration
cat > .env << EOF
DATABASE_URL=postgresql://username:password@localhost:5432/attendance_db
PORT=3001
NODE_ENV=development
EOF

# Start the backend server
npm start
```

The backend server will run on `http://localhost:3001`

#### Step 3: Set Up the Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file with backend API URL
cat > .env << EOF
REACT_APP_API_URL=http://localhost:3001
EOF

# Start the frontend development server
npm start
```

The frontend application will open in your browser at `http://localhost:3000`

#### Step 4: Set Up the Database

```bash
# Create the PostgreSQL database
createdb attendance_db

# Run migrations (if migration scripts are added in future updates)
# npm run migrate
```

### Option 2: Full AWS Deployment with Terraform

#### Step 1: Configure AWS Credentials

Ensure your AWS CLI is configured:

```bash
aws configure
# Enter your AWS Access Key ID, Secret Access Key, and preferred region
```

#### Step 2: Initialize Terraform

```bash
# Navigate to infrastructure directory
cd infra

# Initialize Terraform
terraform init
```

#### Step 3: Review Infrastructure Plan

```bash
# Preview the resources that will be created
terraform plan
```

This will show you:
- VPC and networking components
- EC2 instances for application hosting
- RDS PostgreSQL database
- Security groups and access controls

#### Step 4: Deploy Infrastructure

```bash
# Apply the Terraform configuration
terraform apply

# Type 'yes' when prompted to confirm
```

Terraform will provision:
- AWS VPC with public and private subnets
- EC2 instances for backend and frontend
- RDS PostgreSQL database
- Security groups with appropriate inbound/outbound rules
- Load balancer (if configured)

#### Step 5: Deploy Application Code

After infrastructure is provisioned:

```bash
# Get the EC2 instance IP from Terraform output
terraform output

# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>

# Clone the repository on the EC2 instance
git clone https://github.com/ravadasashank/cloud-attendance-system.git
cd cloud-attendance-system

# Install dependencies and start services
cd backend
npm install
npm start &

cd ../frontend
npm install
npm run build
# Serve the build using a web server like nginx or serve
```

#### Step 6: Configure Environment Variables on EC2

```bash
# Create .env file with RDS connection details
cat > backend/.env << EOF
DATABASE_URL=postgresql://admin:password@<RDS_ENDPOINT>:5432/attendance_db
PORT=3001
NODE_ENV=production
EOF
```

#### Step 7: Access Your Application

Your application will be available at the EC2 public IP or configured domain name.

### Terraform Cleanup

To destroy all AWS resources when no longer needed:

```bash
cd infra
terraform destroy
# Type 'yes' when prompted to confirm
```

## Available Files and Components

This repository includes all necessary starter code and configuration files:

### Backend Components
- ✅ `backend/server.js` - Express server skeleton with basic API structure
- ✅ `backend/package.json` - Backend dependencies (Express, pg, dotenv, etc.)

### Frontend Components
- ✅ `frontend/src/` - React application components
- ✅ `frontend/package.json` - Frontend dependencies (React, axios, etc.)

### Infrastructure Components
- ✅ `infra/main.tf` - Complete Terraform configuration for AWS deployment
  - VPC and networking setup
  - EC2 instance configuration
  - RDS PostgreSQL database
  - Security groups and IAM roles

### Documentation
- ✅ `docs/requirements.md` - Comprehensive functional and non-functional requirements
- ✅ `README.md` - This file with complete deployment instructions

## Development Workflow

1. **Make changes** to backend or frontend code
2. **Test locally** using the local development setup
3. **Commit changes** to your repository
4. **Deploy to AWS** using Terraform and git pull on EC2 instances

## API Endpoints

Once deployed, the backend provides the following API structure:

- `GET /` - Health check endpoint
- `POST /api/attendance` - Record new attendance
- `GET /api/attendance/:id` - Get attendance by ID
- `GET /api/attendance` - List all attendance records
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record

## Database Schema

The PostgreSQL database includes tables for:
- Users
- Attendance records
- Sessions
- Timestamps and metadata

## Security Considerations

- Always use environment variables for sensitive data (database credentials, API keys)
- Enable HTTPS in production using SSL/TLS certificates
- Implement proper authentication and authorization
- Use AWS Security Groups to restrict network access
- Regularly update dependencies to patch security vulnerabilities

## Troubleshooting

### Backend won't start
- Check that PostgreSQL is running
- Verify database credentials in `.env` file
- Ensure port 3001 is not already in use

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` in frontend `.env` file
- Check that backend is running and accessible
- Review CORS settings in backend server

### Terraform apply fails
- Verify AWS credentials are configured correctly
- Check that you have necessary AWS permissions
- Review Terraform error messages for specific resource issues

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Submit a pull request

## Future Enhancements

- Mobile application support
- Biometric authentication integration
- Advanced reporting and analytics
- Email/SMS notifications
- Multi-tenant support
- Docker containerization
- CI/CD pipeline with GitHub Actions

## License

MIT License - feel free to use this project for learning and development purposes.

## Support

For issues, questions, or contributions, please open an issue in the GitHub repository.

---

**Note**: This project includes all core starter code necessary for deployment. The backend server skeleton, frontend React app, Terraform infrastructure scripts, and requirements documentation are all in place and ready for development and deployment.
