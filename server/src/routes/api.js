const router = require("express").Router();

const LogEntry = require("../models/LogEntry.js");

router.get("/", async (req, res) => {
    const entries = await LogEntry.find();
    res.json(entries);
  });

  router.post("/",  async (req, res) => {
      try {
          const logEntry = new LogEntry(req.body);
          const createdEntry = await logEntry.save();
          res.json(createdEntry);
      } catch (error) {
          if (error.name === 'ValidationError') {
              res.status(422);
          }
        next(error);
      }
  });

module.exports = router;