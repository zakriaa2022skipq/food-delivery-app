const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const categoryRouter = require("./router/catergory");
const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const itemRouter = require("./router/item");
const cartRouter = require("./router/cart");

const connectDB = require("./utils/db");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/menuitem", itemRouter);
app.use("/api/cart", cartRouter);

app.get("/api/healthcheck", (req, res) => {
  res.sendStatus(200);
});
app.use(errorMiddleware);
const start = async () => {
  const PORT = process.env.PORT || 4000;
  try {
    await connectDB();
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
