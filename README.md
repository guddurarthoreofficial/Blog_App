# 📝 Blog App (MERN Stack)

A full-featured blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This app allows users to register, log in, create posts, and manage their profiles with authentication and role-based access.

---

## 🚀 Features

- ✅ User registration with photo upload (Cloudinary)
- 🔒 Login/logout with JWT authentication
- 🛡️ Role-based access (Admin/User)
- ✍️ Create, read, update, and delete blog posts
- 📷 Image upload support for user profiles and posts
- 📚 Rich content editing (Markdown or WYSIWYG optional)
- 🍪 Secure token storage using cookies
- 🌐 RESTful API design

---

## 🛠️ Technologies Used

**Frontend**
- React.js
- Axios
- TailwindCSS / Bootstrap (optional)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken (JWT)
- Cloudinary (for image hosting)
- express-fileupload
- dotenv

---

## 📁 Folder Structure


bakend setup 

Blog_App/
├── backend/
│ ├── controller/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
├── frontend/
│ └── (React files)
├── .env
└── README.md



## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app


2. Backend Setup

cd backend
npm install
Create a .env file inside backend/ and add:


PORT=3005
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Run the backend:

backend run command
npm start



3. Frontend Setup

cd ../frontend
npm install
npm run dev

✅ API Endpoints


📸 Sample Response

{
  "message": "User registered successfully",
  "user": {
    "_id": "6816e8eeb885155efa08e716",
    "name": "admin",
    "email": "admin@gmail.com",
    "role": "admin",
    "photo": {
      "public_id": "ytqc62tgfvk3qzwzdbr8",
      "url": "https://res.cloudinary.com/..."
    }
  },
  "token": "JWT_TOKEN"
}
🤝 Contribution
Feel free to fork this repo and submit pull requests. For major changes, please open an issue first.

📃 License
This project is licensed under the MIT License.

👨‍💻 Author
Guddu Kumar
GitHub • LinkedIn






