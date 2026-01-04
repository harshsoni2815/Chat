import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import auth from "./routes/auth.js";
import Dummy from "./models/Dummy.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "API is running...", p: process.env.JWT_SECRET });
});

// Connect to DB
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database connected and models synced!");
    app.listen(port, () =>
      console.log(`🚀 Server running on http://localhost:${port}`)
    );
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();
