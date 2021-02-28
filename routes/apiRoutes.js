const fs = require('fs');
const notes = require('../db/db.json');

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

        const jsonNotes = JSON.stringify(notes);
        fs.writeFile('./db/db.json', jsonNotes, err => {
            if (err) {
                return console.log(err);
            }
            console.log('Success!');
        });
        res.json(true);
    });

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    notes.forEach((arr, index) => {
      if (id == arr.id) {
          
        notes.splice(index, 1);
        const notesCopy = notes.slice();
        const jsonNotes = JSON.stringify(notesCopy)
        fs.writeFile("./db/db.json", jsonNotes, function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("Success!");
        });
      }
    });
    res.json(true);
  });
};