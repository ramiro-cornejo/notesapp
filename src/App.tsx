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
      }
    ],
  },
};


function NoteCard({note}: NoteCardProps) {
  return (
    <div className="nes-container with-title">
      <div>
        <h3 className="title">{note.title}</h3>
        <p>Last edited: {note.lastEdited}</p>
      </div>
      
      <div>
        <button className="nes-btn">Archivar</button>
        <button className="nes-btn">Editar</button>
        <button className="nes-btn">Borrar</button>
      </div>
    </div>

  )
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => api.notes.list());
  return (
    <main>
      <div>
        <h1>Mis Notas</h1>
        <button className="nes-btn">Crear nota</button>
      </div>
      
      {notes.map((note) => (
        <NoteCard key={note.id} note={note}/>
      ))}
    </main>
  )
}

export default App
