require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');

const registrationRoutes = require("./routes/registrationRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

app.use("/api/registrations", registrationRoutes);

app.use(express.static(path.join(__dirname, './frontend/build')))

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
