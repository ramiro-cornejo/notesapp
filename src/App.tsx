import type { Note } from "./types";
import { useState } from "react";
import api from "./Api";
import NoteCard from "./components/NoteCard";

type NoteModalProps = {
  note: Partial<Note>;
  onClose: VoidFunction;
};

function NoteModal({onClose}: NoteModalProps) {
  return (
    <section className="nes-dialog" style={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}} id="dialog-default">
    <div style={{position: "absolute", backgroundColor: "rgba(0,0,0,0.2)", width:'100%', height: '100%'}}></div>
    <form method="dialog" style={{backgroundColor: "white", zIndex: 1, padding: 12, border: "5px solid black"}}>
      <p className="title">Dialog</p>
      <p>Alert: this is a dialog.</p>
      <menu className="dialog-menu">
        <button className="nes-btn" onClick={onClose}>Cancel</button>
        <button className="nes-btn is-primary">Confirm</button>
      </menu>
    </form>
  </section>
  )
}

function App() {
  const [notes , setNotes] = useState<Note[]>(() => api.notes.list());
  const [draft, setDraft] = useState<null | Partial<Note>>(null)

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
        <button className="nes-btn" onClick={() => setDraft({title: "Nota ejemplar"})}>Crear nota</button>
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
      {draft && <NoteModal note={draft} onClose={() => setDraft(null)} />}
    </main>
  )
}

export default App
