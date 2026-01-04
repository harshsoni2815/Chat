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

// router.post("/otp-verify", async (req, res) => {
//   const { otp, id } = req.body;

//   try {
//     const dummyUser = await Dummy.findOne({ where: { id } });

//     // Check if dummy user exists
//     if (!dummyUser) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // OTP mismatch check
//     if (dummyUser.otp != otp) {
//       return res.status(401).json({ success: false, message: "OTP mismatch" });
//     }

//     console.log("OTP verified successfully");

//     // Create new user
//     const result = await User.create({
//       first_name: dummyUser.first_name,
//       last_name: dummyUser.last_name,
//       phone_number: dummyUser.phone_number,
//       email: dummyUser.email,
//       password: dummyUser.password,
//     });

//     // Optionally delete dummy entry after success
//      await Dummy.destroy({ where: { id } });

//     return res.status(200).json({ success: true, user: result });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const valid = await bcrypt.compare(password, user.password);
//     if (!valid) return res.status(401).json({ message: "Invalid password" });

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         phone_number: user.phone_number,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/sign-up", signupController);

router.post("/log-in", loginController);



export default router;
