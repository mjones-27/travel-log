const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const middlewares = require('./middlewares');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(cors({
    origin: 'http://localhost:8080',
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.json({
        message: 'Hello World!',
    })
  });

app.use(middlewares.notFound);  
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });