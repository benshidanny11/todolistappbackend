const express = require("express");
const mongoose = require("mongoose");
const todoRouter = require("./routers/todos");
const dotenv=require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

console.log(process.env.DB_CONNECTION_URL)
mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

var bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 7890;
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Dear user, welcome to todolist app",
  });
});
app.use(express.json());
app.use("/todos", todoRouter);
app.listen(PORT, () => {
  console.log(`To do list is up and running on PORT ${PORT} `);
});
//export default app;
