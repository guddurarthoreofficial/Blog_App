# 📝 Blog Application - MERN Stack

This is a **full-stack Blog Application** built using the **MERN (MongoDB, Express, React, Node.js)** stack. It allows users to register, login, create blogs, upload blog images (via Cloudinary), edit/update blogs, and explore all posted blogs.

---

## 🔧 Technologies Used

### Frontend:
- React.js
- React Hook Form – for form validation
- Axios – for HTTP requests
- React Toastify – for user-friendly alerts
- Tailwind CSS / CSS Modules – for styling

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- bcryptjs – for password hashing
- jsonwebtoken – for authentication (JWT)
- Cloudinary SDK – for image uploads
- express-fileupload – for handling file uploads
- dotenv – for managing environment variables

---

## 🔐 Features

- ✅ User Registration and Login
- ✅ JWT-based Authentication with Secure Cookies
- ✅ Protected Routes
- ✅ Create a New Blog (with Title, Category, About, Image)
- ✅ Edit and Update Blogs (including optional image update)
- ✅ Delete Blogs
- ✅ Image Upload to Cloudinary
- ✅ RESTful API architecture
- ✅ Responsive UI (mobile + desktop)

---

## 📁 Project Structure

blog-app/
│
├── client/              # React Frontend
│   ├── components/
│   ├── pages/
│   ├── context/         # Auth Provider
│   ├── App.js
│   └── ...
│
├── server/              # Node/Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/         # Temporary upload folder (if used)
│   ├── index.js
│   └── .env
│
├── README.md
└── .gitignore


 Backend Setup (Express + MongoDB)

 git clone https://github.com/guddurarthoreofficial/Blog_App
cd blog-app/server
npm install



PORT=3005
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000

# Cloudinary
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret






Start backend server:
npm start




🌐 Frontend Setup (React)
Go to client folder:

cd ../client


Install dependencies:

npm install


Create .env file in the client directory:
REACT_APP_BACKEND_URL=http://localhost:3005



npm start

npm  run dev 

🔐 Authentication Flow
User registers and logs in.

Backend generates a JWT token and sets it as an HTTP-only cookie.

Frontend accesses protected routes via withCredentials: true and adds Authorization: Bearer <token> in headers.

📸 Image Upload via Cloudinary
Images are uploaded via express-fileupload middleware.

Uploaded images are stored in Cloudinary using the cloudinary.v2.uploader.upload() method.

Image URLs are stored in MongoDB as part of the blog document.

📦 API Endpoints
User Routes (/api/users)
POST /register – Register a new user

POST /login – Login and get token

GET /profile – Get user profile (protected)

GET /logout – Logout user

Blog Routes (/api/blogs)
POST /create – Create new blog (protected)

GET /all – Fetch all blogs

GET /:id – Get single blog by ID

PUT /update/:id – Update a blog (protected)

DELETE /delete/:id – Delete a blog (protected)





