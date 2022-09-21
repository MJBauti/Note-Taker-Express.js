const noteTaker = require('express').Router();
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

noteTaker.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"))
});

noteTaker.post("/", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("../db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuidv4();
    notes.push(newNotes);
    fs.writeFileSync("../db/db.json", JSON.stringify(notes))
    res.json(notes);
});

noteTaker.delete("/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("../db/db.json"));
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("../db/db.json", JSON.stringify(delNote));
    res.json(delNote);
})

module.exports = noteTaker