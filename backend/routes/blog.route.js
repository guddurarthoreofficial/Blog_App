import express from 'express';
import {createBlog,deleteBlog} from '../controller/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post('/create',isAuthenticated,isAdmin("admin"),createBlog);
router.post('/delete/:id',isAuthenticated,isAdmin("admin"),deleteBlog);



export default router;
