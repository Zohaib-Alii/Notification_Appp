const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
// here we remove cors functionality
app.use(cors());
// dotenv middleware
dotenv.config();

app.use(express.json());
// routes
app.use("/api/userDetails", userRouter);

//  mongoose.connection
// process.env.DATABASE;
// firstly i save all the Credential in .env file then i push code on git
//  but then i pull the repo and check .env file some issues thats why i
// set the db string here
const db =
  "mongodb+srv://zohaib:admin0101@cluster0.iivye74.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
// also for port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port ", { PORT });
});
