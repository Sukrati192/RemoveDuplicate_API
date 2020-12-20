const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

const DataSchema = mongoose.Schema({
  data: [],
});

const Data = mongoose.model("Data", DataSchema);

app.post("/removeDuplicate", (req, res) => {
  const { inputArray } = req.body;
  const outputArray = [...new Set(inputArray)];
  const doc = new Data({ data: outputArray });
  doc.save();
  res.json(outputArray);
});

app.listen(5000, () => {
  console.log("server up and running");
});