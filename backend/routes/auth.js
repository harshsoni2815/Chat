import express from "express";
import Dummy from "../models/Dummy.js";
import User from "../models/User.js";
import { Result } from "pg";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getToken from "../utils/Jwt.js";
import { loginController, signupController } from "../controllers/authentication/authencation.Contoller.js";
const router = express.Router();



router.post("/sign-up", signupController);

router.post("/log-in", loginController);



export default router;
