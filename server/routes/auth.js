import express from 'express';
import { login } from '../controllers/auth/login.js';
import { signUp } from '../controllers/auth/signup.js';

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);


export default router;