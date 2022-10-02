const express = require("express");
app.use(express.json());
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/userDetails", userRouter);

module.exports = app;
