//import what we need
const express = require("express");
const router = express.Router();
const path = require("path");

//get requests for notes to and wildcard path to return index

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  
router.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  module.exports = router;