require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", (req, res, next) => {
  res.send("Hello from Express");
});

app.listen(process.env.PORT);
console.log(`Express server started on port ${process.env.PORT}`)
