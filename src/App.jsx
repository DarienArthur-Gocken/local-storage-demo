import { useEffect, useState } from "react";
import StickyNote from "./components/StickyNote.jsx";
import AddButton from "./components/AddButton.jsx";
import "./App.css";

export default function App() {
    const [notes, setNotes] = useState(() => {
      const saved = localStorage.getItem("sticky-notes");

      return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => { localStorage.setItem("sticky-notes", JSON.stringify(notes) ); }, [notes]);

    function addNote() {
        const newNote = { id: crypto.randomUUID(), text: "", backgroundColor: "#FDE68A", textColor: "#111827", };

        setNotes((prev) => [...prev, newNote]);
    }

    function updateNote(id, updates) {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id ? { ...note, ...updates } : note
            )
        );
    }

    function deleteNote(id) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
    }

    return (
        <div className="app">
            <div className="notes-grid">
                {notes.map((note) => (
                    <StickyNote key={note.id} note={note} onUpdate={updateNote} onDelete={deleteNote} />
                ))}
                <AddButton onAdd={addNote} />
            </div>
        </div>
    );
}