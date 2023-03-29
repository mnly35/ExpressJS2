const express = require("express");
const app = express();
const env = require("dotenv/config");
const cors = require("cors");
//Add route reference
const student = require("./routes/student");
const user = require("./routes/login");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

app.use(express.json());
app.use(cors());
//Add routes here
app.use("/student", student);
app.use("/user", user);

app.listen(process.env.PORT, () => {
  console.log("Express server is started at Port Number..." + process.env.PORT);
  console.log(process.env.DBCONNECTION);
  mongoose.connect(
    process.env.DBCONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => {
      if (err) return console.log(err);

      console.log("Database is connected...");
    }
  );
});
