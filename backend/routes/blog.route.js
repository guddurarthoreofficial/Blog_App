import express from 'express';
import {createBlog,deleteBlog, getAllBlogs, getMyBlogs, getSingleBlogs,updateBlog} from '../controller/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/create',isAuthenticated,isAdmin("admin"),createBlog);

// router.post('/create',createBlog);

router.delete('/delete/:id',isAuthenticated,isAdmin("admin"),deleteBlog);

// router.get('/all-blogs/',isAuthenticated,getAllBlogs);
router.get('/all-blogs/',getAllBlogs);

router.get('/single-blogs/:id',isAuthenticated,getSingleBlogs);
router.get('/my-blog',isAuthenticated,isAdmin("admin"),getMyBlogs);
router.put('/update/:id',isAuthenticated,isAdmin("admin"),updateBlog);



export default router;
