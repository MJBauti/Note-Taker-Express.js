const express = require('express');

const notesRouter = require('./noteTaker');

const app = express();

app.use('/noteTaker', notesRouter);

module.exports = app;