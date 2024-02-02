import Note from "./Note";

const NoteList = ({ notes, handleNoteClick, handleDeleteNote }) => {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleNoteClick={handleNoteClick}
          handleDeleteNote={handleDeleteNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
