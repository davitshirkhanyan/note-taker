const fs = require('fs');
const notes = require('../Develop/db/db.json');

module.exports = app => {
    app.get('/api/notes', (req, res) => {
        return res.json(notes);
    });

    app.get('/api/notes/:id', (req, res) => {
        const result = findById(req.params.id, notes);
        
        if (result) {
            return res.json(result);
        } 
        return res.send(404);
    });

    app.post('/api/notes', (req, res) => {
        const newNotes = req.body;

        if (notes.length === 0) {
            newNotes.id = 1;
        } else {
            newNotes.id = (notes[notes.length - 1].id + 1);
        }
        notes.push(newNotes);

        let jsonNotes = JSON.stringify(notes);
        fs.writeFile('../Develop/db/db.json', jsonNotes, err => {
            if (err) {
                return err;
            }
            console.log('Success!');
        });
        res.json(true);
    });
};