import type { Note } from "./types";
import { useState } from "react";
import api from "./Api";
import NoteCard from "./components/NoteCard";



function App() {
  const [notes , setNotes] = useState<Note[]>(() => api.notes.list());

  function handleDelete(id: Note["id"]) {
    setNotes((notes) => notes.filter((note) => note.id !== id))
  }

  function handleArchive(id: Note["id"]){
    setNotes((notes) =>
    notes.map((note) => {
      if (note.id !== id) return note;

      return {
        ...note,
        archived: !note.archived,
      };
    }),
    );
  }

  return (
    <main>
      <div style={{marginBottom: 24}}>
        <h1>Mis Notas</h1>
        <button className="nes-btn">Crear nota</button>
      </div>
      
      <div style={{
        display: "grid", 
        gap: 24, 
        gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))",
        }}
        >
        {notes.map((note) => (
          <NoteCard onDelete={handleDelete} onArchive={handleArchive} key={note.id} note={note}/>
        ))}
      </div>
    </main>
  )
}

export default App
