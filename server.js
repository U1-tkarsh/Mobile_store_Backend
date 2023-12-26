require('./config/db');
const express = require('express');
const errorHandler = require('./middleware/middleware');
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app= express()
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.json());
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
app.use('/api/attendance', require('./routes/attendanceRoute'));
app.use("/api/Users", require('./routes/userRoute'));
app.use("/api/smartPhone", require('./routes/smartPhoneRoute'));
app.use("/api/confirmed", require(`./routes/confirmedRoute`));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})