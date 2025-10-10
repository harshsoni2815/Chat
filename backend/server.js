import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import Conversation from "./models/Converstation.js";
import Message from "./models/Messages.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;



// Set EJS view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.render("index", { title: "Home Page" });
});


// Connect to DB
(async () => {
  try {
    await sequelize.authenticate();
 await sequelize.sync();
    console.log("✅ Database connected and models synced!");
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
})();
