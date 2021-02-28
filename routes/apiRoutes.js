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
};