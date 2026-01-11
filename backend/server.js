import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import auth from "./routes/auth.js";
import cors from "cors";


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Next.js frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);

app.get("/test", (req, res) => {
  res.json({ message: "API is running...", p: process.env.JWT_SECRET });
});


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
