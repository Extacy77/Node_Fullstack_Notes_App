const express = require("express");
const router = express.Router();
const schemas = require("../models/schemas");

router.post("/api/my-note-app/add-note", async (req, res) => {
  const { id, title, content, date } = req.body;
  const noteData = {
    id: id,
    title: title,
    content: content,
    date: date,
  };
  const newNotes = new schemas.Notes(noteData);
  const saveNote = await newNotes.save();
  if (saveNote) {
    res.send("New note added.");
  } else {
    res.send("Failed to add new note! ");
  }
  res.end();
});

router.put("/api/my-note-app/update-note", async (req, res) => {
  const id = req.query.id;
  if (id) {
    const filter = { id: id };
    const { title, content, date } = req.body;
    const updatedData = {
      id: id,
      title: title,
      content: content,
      date: date,
    };
    const updateNote = await schemas.Notes.findOneAndUpdate(
      filter,
      updatedData,
      {
        new: true,
      }
    );

    if (updateNote) {
      res.send("The note is updated.");
    } else {
      console.log("Note: " + updatedData.content);
      res.send("Failed to update the note!");
    }
    res.end();
  }
});

router.delete("/api/my-note-app/delete-note", async (req, res) => {
  const id = req.query.id;
  const deleteNote = await schemas.Notes.deleteOne({ id });
  if (deleteNote) {
    res.send("Note successfully deleted.");
  } else {
    res.send("Failed to delete the note!");
  }
  res.end();
});

router.get("/api/my-note-app", async (req, res) => {
  const notes = schemas.Notes;
  const noteData = await notes.find({}).exec();
  if (noteData) {
    res.send(JSON.stringify(noteData));
  }
});

module.exports = router;
