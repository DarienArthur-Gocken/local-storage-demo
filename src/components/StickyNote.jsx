import { useEffect, useRef, useState } from "react";

const noteColors = [
    "#FDE68A",
    "#FCA5A5",
    "#93C5FD",
    "#86EFAC",
    "#C4B5FD",
];

const textColors = [
    "#111827",
    "#FFFFFF",
    "#1E3A8A",
    "#7F1D1D",
];

export default function StickyNote({ note, onUpdate, onDelete }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const textareaRef = useRef(null);

    useEffect(() => {
        if (note.text === "") {
            textareaRef.current?.focus();
        }
    }, [note.text]);

    return (
        <div className="sticky-note" style={{ backgroundColor: note.backgroundColor}}>
            <div className="note-menu">
                <button className="menu-button" onClick={() => setMenuOpen((prev) => !prev) }>
                    ⋮
                </button>

                {menuOpen && (
                    <div className="menu-dropdown">
                        <div className="menu-section">
                            <p>Note Color</p>

                            <div className="color-row">
                                {noteColors.map((color) => (
                                    <button key={color} className="color-circle" style={{ backgroundColor: color, }}
                                        onClick={() => onUpdate(note.id, { backgroundColor: color, })}/>
                                ))}
                            </div>
                        </div>

                        <div className="menu-section">
                            <p>Text Color</p>

                            <div className="color-row">
                                {textColors.map((color) => (
                                    <button key={color} className="color-circle" style={{ backgroundColor: color, }}
                                        onClick={() => onUpdate(note.id, { textColor: color, })}/>
                                ))}
                            </div>
                        </div>

                        <button className="delete-button" onClick={() => onDelete(note.id)}>
                            Delete Note
                        </button>
                    </div>
                )}
            </div>

            <textarea ref={textareaRef} className="note-textarea" placeholder="Write something..." value={note.text}
                style={{ color: note.textColor }} onChange={(e) => onUpdate(note.id, { text: e.target.value, })}/>
        </div>
    );
}