const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../db/db.json');

router.get('/api/notes', (req, res) => {
    try {
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
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const savedNotes = JSON.parse(fileContent);
        
        if (req.body && req.body.title && req.body.text) {
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uuidv4(),
            };
            
            savedNotes.push(newNote);
            fs.writeFileSync(filePath, JSON.stringify(savedNotes, null, 2));
            res.json(savedNotes);
        } else {
            res.status(400).json({ error: 'Note body must at least contain a title and text' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    
    try {
        let noteData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const noteIndex = noteData.findIndex(note => note.id === parseInt(noteId));
        
        if (noteIndex !== -1) {
            noteData.splice(noteIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify(noteData, null, 2));
            res.json({ message: 'Note Deleted!' });
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;