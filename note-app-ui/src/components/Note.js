import React from "react";
import { MdDeleteForever } from "react-icons/md";

const Note = ({ note, handleNoteClick, handleDeleteNote }) => {
  return (
    <div className="note-item" onClick={() => handleNoteClick(note)}>
      <header className="note-header">
        <h2>{note.title}</h2>
        <MdDeleteForever
          className="delete-icon"
          size="2.1em"
          onClick={(event) => handleDeleteNote(event, note.id)}
        />
      </header>
      <p>{note.content}</p>
      <footer className="note-footer">
        <small>{note.date}</small>
      </footer>
    </div>
  );
};

export default Note;
