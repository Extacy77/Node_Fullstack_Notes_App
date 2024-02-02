const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  id: { type: String },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String },
});

const Notes = mongoose.model("Notes", notesSchema, "notes");
const mySchemas = { Notes: Notes };

module.exports = mySchemas;
