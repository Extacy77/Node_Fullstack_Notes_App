import "./App.css";
import Header from "./components/Header";
import SearchNote from "./components/SearchNote";
import NoteList from "./components/NoteList";
import { nanoid } from "nanoid";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchNote, setSearchNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);
    return () => {
      processing = false;
    };
  }, [notes]);

  const axiosFetchData = async (processing) => {
    await axios
      .get("http://localhost:4000/api/my-note-app")
      .then((res) => {
        if (processing) {
          setNotes(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const axiosPostData = async () => {
    const date = new Date();
    const postData = {
      id: nanoid(),
      title: title,
      content: content,
      date: date.toLocaleDateString(),
    };

    if (!title) {
      setError(
        <p className="required">Title is empty. Please type a title!</p>
      );
    } else if (!content) {
      setError(
        <p className="required">Content is empty. Please type a content!</p>
      );
    } else {
      await axios
        .post("http://localhost:4000/api/my-note-app/add-note", postData)
        .then((res) => setError(<p className="success">{res.data}</p>));
    }
  };

  const axiousPutData = async (id) => {
    const date = new Date();
    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
      date: date.toLocaleDateString(),
    };
    await axios
      .put(
        "http://localhost:4000/api/my-note-app/update-note?id=" + id,
        updatedNote
      )
      .then((res) => setError(<p className="success">{res.data}</p>));
  };

  const axiousDeleteData = async (id) => {
    await axios
      .delete("http://localhost:4000/api/my-note-app/delete-note?id=" + id)
      .then((res) => setError(<p className="success">{res.data}</p>));
  };

  const updateNote = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (event) => {
    event.preventDefault();
    if (!selectedNote) {
      return;
    }
    axiousPutData(selectedNote.id);
    setTitle("");
    setContent("");
    setSelectedNote(null);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosPostData();
    setTitle("");
    setContent("");
  };

  const deleteNote = (event, id) => {
    event.stopPropagation();
    axiousDeleteData(id);
    setError("");
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="app-container">
        <Header handleTogglerSwitch={setDarkMode} />
        <SearchNote handleSearchNote={setSearchNote} />
        <div className="app-main">
          <form className="note-form" action="/addNewNote">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Title..."
              required
            />
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              name="note-content"
              id="note-content"
              cols="20"
              rows="12"
              placeholder="Content..."
              required
            ></textarea>
            {error}
            {selectedNote ? (
              <button
                type="submit"
                className="addNote"
                onClick={(event) =>
                  selectedNote ? handleUpdateNote(event) : handleSubmit(event)
                }
              >
                Update Note
              </button>
            ) : (
              <button
                required
                type="submit"
                className="addNote"
                onClick={(event) => handleSubmit(event)}
              >
                Add Note
              </button>
            )}
          </form>
          <NoteList
            notes={notes.filter(
              (note) =>
                note.content.toLowerCase().includes(searchNote.toLowerCase()) ||
                note.title.toLowerCase().includes(searchNote.toLowerCase())
            )}
            handleNoteClick={updateNote}
            handleDeleteNote={deleteNote}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
