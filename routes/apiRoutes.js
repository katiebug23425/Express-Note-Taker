const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/api/notes', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../db/db.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const savedNotes = JSON.parse(fileContent);
        res.json(savedNotes);
    } catch (error) {
        console.error('Error reading or parsing the JSON file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;