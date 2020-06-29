const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const logs = require('./routes/api.js');

require('dotenv').config();

const middlewares = require('./middlewares');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost/populate", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   });

app.get("/", (req, res) => {
    res.json({
        message: 'Hello World!',
    })
  });

  // routes
app.use('/api/logs', logs);

app.use(middlewares.notFound);  
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });