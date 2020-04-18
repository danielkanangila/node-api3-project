// code away!
const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const logger = require("./middleware/logger");

const app = express()
// setting logger middleware
app.use(logger)
app.use(express.json());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
