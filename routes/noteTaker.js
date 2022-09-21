const noteTaker = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { createNewNote, updateDb } = require('../helpers/fsUtils');
const {notes} = require("../../db/db.json");

noteTaker.get("/", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))
});

noteTaker.post("/", (req, res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

noteTaker.delete("/:id", (req, res) => {
    const params = req.params.id
    updateDb(params, notes);
    res.redirect('');
})

module.exports = noteTaker