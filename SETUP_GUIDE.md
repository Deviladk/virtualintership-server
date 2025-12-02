# Backend Setup Guide

Quick guide to get the backend running.

## Step 1: Install Dependencies

```bash
cd server
npm install
```

## Step 2: Set Up MongoDB

### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `<password>` and `<database>` in the connection string

## Step 3: Configure Environment Variables

1. Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/internship-platform

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship-platform

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:3000
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

## Step 4: Seed the Database (Optional)

Populate the database with initial courses and internships:

```bash
npm run seed
```

This will create:
- 7 sample courses
- 7 sample internships

## Step 5: Start the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Step 6: Verify Installation

Test the API:

```bash
# Health check
curl http://localhost:5000/api/health

# Get all courses
curl http://localhost:5000/api/courses

# Get all internships
curl http://localhost:5000/api/internships
```

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check firewall settings for MongoDB Atlas
- Verify network access in MongoDB Atlas dashboard

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using port 5000

### JWT Secret Error
- Make sure `JWT_SECRET` is set in `.env` file
- Use a long, random string (at least 32 characters)

### Module Not Found
- Run `npm install` again
- Check that you're in the `server` directory

## Testing with Postman/Thunder Client

1. Import the API endpoints from `API_DOCUMENTATION.md`
2. Test registration: `POST /api/auth/register`
3. Test login: `POST /api/auth/login`
4. Copy the token from response
5. Use token in Authorization header: `Bearer <token>`
6. Test protected routes

## Next Steps

1. Connect frontend to backend API
2. Update frontend API calls to use backend endpoints
3. Implement authentication flow in frontend
4. Test complete user flow

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use a strong, random `JWT_SECRET`
3. Configure proper CORS settings
4. Set up MongoDB Atlas with proper security
5. Use environment variables for sensitive data
6. Set up proper error logging
7. Configure rate limiting
8. Use HTTPS in production


