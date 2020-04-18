// code away!
const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const env = process.env;

const app = express()
app.use(express.json());
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.listen(env.PORT, () => {
    console.log(`Application listen on ${env.HOST}:${env.PORT}`);
});
