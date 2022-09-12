import { useState } from "react";

type Note = {
  id: string;
  title: string;
  lastEdited: string;
  archived: boolean;
  content: string;
  categories: string[];
};

type NoteCardProps = {
  note: Note;
  onArchive: (id:Note['id']) => void
};

const api = {
  notes: {
    list: () => [
      {
        id: "nota",
        title: "Titulo",
        lastEdited: "12/09/2022",
        archived: false,
        content: "Contenido",
        categories: ["random"],
      },
      {
        id: "nota2",
        title: "Titulo",
        lastEdited: "15/09/2022",
        archived: false,
        content: "Contenido",
        categories: ["random"],
      }
    ],
  },
};


function NoteCard({note, onArchive}: NoteCardProps) {
  return (
    <div className="nes-container with-title">
      <div>
        <h3 className="title">{note.title}</h3>
        <p>Last edited: {note.lastEdited}</p>
      </div>
      
      <div style={{display: "flex", gap: 12}}>
        <button className="nes-btn" onClick={() => onArchive(note.id)}>Archivar: {String(note.archived)}</button>
        <button className="nes-btn">Editar</button>
        <button className="nes-btn">Borrar</button>
      </div>
    </div>

  )
}

function App() {
  const [notes , setNotes] = useState<Note[]>(() => api.notes.list());

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
          <NoteCard onArchive={handleArchive} key={note.id} note={note}/>
        ))}
      </div>
    </main>
  )
}

export default App
