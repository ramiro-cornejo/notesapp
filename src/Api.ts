import { Note } from "./types";

const api = {
    notes: {
      list: (): Note[] => [
        {
          id: "nota",
          title: "Primera nota",
          lastEdited: "12/09/2022",
          archived: false,
          content: "Contenido",
          categories: ["random"],
        },
        {
          id: "nota2",
          title: "Segunda nota",
          lastEdited: "15/09/2022",
          archived: false,
          content: "Contenido",
          categories: ["random"],
        }
      ],
    },
};

export default api;