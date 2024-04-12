const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

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

router.post('/api/notes', (req, res) => {
    try {
        const filePath = path.join(__dirname, '../db/db.json');
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const savedNotes = JSON.parse(fileContent);
        let newNote;

        if (req.body && req.body.title && req.body.text) {
            newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uuidv4(),
            };

            savedNotes.push(newNote);

            fs.writeFileSync(filePath, JSON.stringify(savedNotes));

            res.json(savedNotes);
        } else {
            res.status(400).json('Note body must at least contain a title and text');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;