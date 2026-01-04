import User from "../../models/User.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import getToken from "../../utils/Jwt.js";

async function signupController(req, res) {
  const { first_name, last_name, email, phone_number, password } = req.body;

  try {
    if (!first_name || !last_name || !email || !phone_number || !password) {
      return res.status(400).json({ success: false, message: "wrong input " });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone_number: phone_number }],
      },
    });

    if (user) {
      return res
        .status(400)
        .json({ message: "already a user is there", success: false });
    }

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      phone_number,
      password,
      project: "chat",
    });

    if (newUser) {
      const token = getToken(newUser.id);
      res.status(200).json({
        success: true,
        message: "successfully register",
        userId: newUser.id,
        token,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function loginController(req, res) {
  const { email = "", phone_number = "", password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { phone_number: phone_number }],
      },
    });

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      res.status(401).json({ success: false, message: "Wrong password" });
    }

    const token = getToken(user.id);
    res
      .status(200)
      .json({ success: true, message: "successfully Logged In", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
}

export { signupController, loginController };
