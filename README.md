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
├── infra/             # Terraform infrastructure code
│   ├── main.tf        # Main Terraform configuration
│   ├── variables.tf   # Variable definitions
│   ├── outputs.tf     # Output values
│   └── README.md      # Infrastructure documentation
└── docs/              # Project documentation
    └── README.md      # Additional documentation
```

![Project Architecture: Cloud Attendance System—End-to-End Stack and File Structure](ChatGPT-Image-Oct-21-2025-04_33_07-PM.jpg)

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- AWS Account with appropriate permissions
- Terraform (v1.0 or higher)
- npm or yarn package manager

## Installation & Setup

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your database configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=attendance_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Infrastructure Deployment
1. Navigate to the infra directory:
   ```bash
   cd infra
   ```

2. Initialize Terraform:
   ```bash
   terraform init
   ```

3. Review the planned changes:
   ```bash
   terraform plan
   ```

4. Apply the infrastructure:
   ```bash
   terraform apply
   ```

## API Endpoints
- `POST /api/attendance` - Record new attendance entry
- `GET /api/attendance` - Retrieve attendance records
- `GET /api/attendance/:id` - Get specific attendance record
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record
- `GET /api/users` - List all users
- `POST /api/users` - Create new user

## AWS Architecture
The application uses the following AWS services:
- **EC2**: Application hosting
- **RDS**: PostgreSQL database
- **VPC**: Network isolation
- **Security Groups**: Network access control

## Testing
Run the test suite:
```bash
npm test
```

## Deployment
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy using Terraform:
   ```bash
   cd infra
   terraform apply
   ```

## Troubleshooting

### Common Issues
#### Database connection errors
- Verify database credentials in `.env` file
- Ensure port 3001 is not already in use

#### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` in frontend `.env` file
- Check that backend is running and accessible
- Review CORS settings in backend server

#### Terraform apply fails
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
