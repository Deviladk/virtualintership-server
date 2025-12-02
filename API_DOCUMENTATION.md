# API Documentation

Complete API documentation for the Internship Platform backend.

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/api/auth/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login User
**POST** `/api/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Get Current User
**GET** `/api/auth/me` (Protected)

Response:
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "enrolledCourses": [],
    "appliedInternships": []
  }
}
```

---

## Course Endpoints

### Get All Courses
**GET** `/api/courses`

Query Parameters:
- Optional: None

Response:
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "_id": "...",
      "title": "Python Programming",
      "description": "...",
      "duration": "6 Weeks",
      "originalPrice": 4999,
      "discountedPrice": 2999,
      "badge": "Bestseller",
      "image": "🐍",
      "category": "Programming",
      "isActive": true,
      "enrolledCount": 0
    }
  ]
}
```

### Get Single Course
**GET** `/api/courses/:id`

Response:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Python Programming",
    ...
  }
}
```

### Search Courses
**GET** `/api/courses/search?q=python`

Response: Same format as Get All Courses

### Create Course (Admin Only)
**POST** `/api/courses` (Protected, Admin)

Request Body:
```json
{
  "title": "New Course",
  "description": "Course description",
  "duration": "6 Weeks",
  "originalPrice": 4999,
  "discountedPrice": 2999,
  "badge": "Popular",
  "image": "💻",
  "category": "Programming"
}
```

### Update Course (Admin Only)
**PUT** `/api/courses/:id` (Protected, Admin)

### Delete Course (Admin Only)
**DELETE** `/api/courses/:id` (Protected, Admin)

---

## Internship Endpoints

### Get All Internships
**GET** `/api/internships`

Query Parameters:
- Optional: `category` (filter by category)

Response:
```json
{
  "success": true,
  "count": 7,
  "data": [
    {
      "_id": "...",
      "title": "Web Development",
      "description": "...",
      "duration": "8 Weeks",
      "category": "Web Development",
      "badge": "Popular",
      "image": "🌐",
      "positionsAvailable": 45,
      "price": "Free",
      "isActive": true,
      "appliedCount": 0
    }
  ]
}
```

### Get Single Internship
**GET** `/api/internships/:id`

### Search Internships
**GET** `/api/internships/search?q=web`

### Apply for Internship
**POST** `/api/internships/:id/apply` (Protected)

Request Body:
```json
{
  "resume": "https://example.com/resume.pdf",
  "coverLetter": "I am interested in this position..."
}
```

Response:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "_id": "...",
    "user": "...",
    "internship": "...",
    "status": "pending",
    "appliedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Create Internship (Admin Only)
**POST** `/api/internships` (Protected, Admin)

### Update Internship (Admin Only)
**PUT** `/api/internships/:id` (Protected, Admin)

### Delete Internship (Admin Only)
**DELETE** `/api/internships/:id` (Protected, Admin)

---

## Enrollment Endpoints

### Get User Enrollments
**GET** `/api/enrollments` (Protected)

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "user": "...",
      "course": {
        "_id": "...",
        "title": "Python Programming",
        "description": "...",
        "duration": "6 Weeks",
        "image": "🐍"
      },
      "payment": {
        "_id": "...",
        "amount": 2999,
        "status": "completed",
        "paymentMethod": "card"
      },
      "status": "active",
      "enrolledAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Enrollment
**GET** `/api/enrollments/:id` (Protected)

### Create Enrollment
**POST** `/api/enrollments` (Protected)

Request Body:
```json
{
  "courseId": "507f1f77bcf86cd799439011",
  "paymentId": "507f1f77bcf86cd799439012"
}
```

### Update Enrollment
**PUT** `/api/enrollments/:id` (Protected)

Request Body:
```json
{
  "status": "completed"
}
```

---

## Payment Endpoints

### Create Payment
**POST** `/api/payments` (Protected)

Request Body:
```json
{
  "courseId": "507f1f77bcf86cd799439011",
  "paymentMethod": "card",
  "paymentDetails": {
    "cardLastFour": "1234",
    "transactionId": "TXN123456789"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Payment successful and enrollment completed",
  "data": {
    "payment": {
      "_id": "...",
      "user": "...",
      "course": "...",
      "amount": 2999,
      "status": "completed",
      "transactionId": "TXN123456789",
      "paidAt": "2024-01-01T00:00:00.000Z"
    },
    "enrollment": {
      "_id": "...",
      "status": "active",
      ...
    }
  }
}
```

### Get User Payments
**GET** `/api/payments` (Protected)

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "user": "...",
      "course": {
        "_id": "...",
        "title": "Python Programming",
        "description": "...",
        "image": "🐍"
      },
      "amount": 2999,
      "paymentMethod": "card",
      "status": "completed",
      "transactionId": "TXN123456789",
      "paidAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Single Payment
**GET** `/api/payments/:id` (Protected)

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Example Frontend Integration

### Setting up Axios

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Example Usage

```javascript
// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Get Courses
const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data.data;
};

// Enroll in Course (with payment)
const enrollInCourse = async (courseId, paymentMethod) => {
  const response = await api.post('/payments', {
    courseId,
    paymentMethod,
    paymentDetails: {}
  });
  return response.data;
};
```


