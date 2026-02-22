const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const router = require("./routes/index.js");
const webhooks = require("./controller/order/webhook.js");

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.post("/api/webhook", express.raw({ type: "application/json" }), webhooks);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB();
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("Connected to DB");
//     console.log(`Server is running on PORT: ${PORT}`);
//   });
// });

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

module.exports = app;
