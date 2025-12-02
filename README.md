# Internship Platform Backend API

Backend API for the Internship Platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Course Management (CRUD operations)
- ✅ Internship Management (CRUD operations)
- ✅ Enrollment System
- ✅ Payment Processing
- ✅ Search Functionality
- ✅ User Profile Management
- ✅ Role-based Access Control (Admin/Student)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/internship-platform
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship-platform

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `GET /api/courses/search?q=query` - Search courses
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)

### Internships
- `GET /api/internships` - Get all internships
- `GET /api/internships/:id` - Get single internship
- `GET /api/internships/search?q=query` - Search internships
- `POST /api/internships` - Create internship (Admin only)
- `PUT /api/internships/:id` - Update internship (Admin only)
- `DELETE /api/internships/:id` - Delete internship (Admin only)
- `POST /api/internships/:id/apply` - Apply for internship (Protected)

### Enrollments
- `GET /api/enrollments` - Get user enrollments (Protected)
- `GET /api/enrollments/:id` - Get single enrollment (Protected)
- `POST /api/enrollments` - Create enrollment (Protected)
- `PUT /api/enrollments/:id` - Update enrollment (Protected)

### Payments
- `GET /api/payments` - Get user payments (Protected)
- `GET /api/payments/:id` - Get single payment (Protected)
- `POST /api/payments` - Create payment (Protected)

## Authentication

To access protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Models

### User
- name, email, password
- role (student/admin)
- enrolledCourses (array)
- appliedInternships (array)

### Course
- title, description, duration
- originalPrice, discountedPrice
- badge, image, category
- isActive, enrolledCount

### Internship
- title, description, duration
- category, badge, image
- positionsAvailable, price
- isActive, appliedCount

### Enrollment
- user, course, payment
- status, enrolledAt, completedAt

### Payment
- user, course, amount
- paymentMethod, status
- transactionId, paidAt

### InternshipApplication
- user, internship
- status, appliedAt
- resume, coverLetter

## Error Handling

All errors are handled by the centralized error handler middleware. Errors are returned in the following format:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Development

### Project Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Route controllers
│   ├── authController.js
│   ├── courseController.js
│   ├── internshipController.js
│   ├── enrollmentController.js
│   └── paymentController.js
├── middleware/
│   ├── auth.js             # Authentication middleware
│   └── errorHandler.js     # Error handling middleware
├── models/                  # Mongoose models
│   ├── User.js
│   ├── Course.js
│   ├── Internship.js
│   ├── Enrollment.js
│   ├── Payment.js
│   └── InternshipApplication.js
├── routes/                  # API routes
│   ├── auth.js
│   ├── courses.js
│   ├── internships.js
│   ├── enrollments.js
│   └── payments.js
├── utils/
│   └── generateToken.js    # JWT token generator
├── .env.example            # Environment variables example
├── .gitignore
├── package.json
├── server.js               # Main server file
└── README.md
```

## License

ISC


