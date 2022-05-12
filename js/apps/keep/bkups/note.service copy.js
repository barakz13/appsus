import { storageService } from "./async-storage-service.js";
import { utilService } from "./util-service.js";
const NOTES_KEY = "notes";
_createNotes();

export const noteService = {
  query,
  remove,
  save, 
  get,
  getEmptyNote,
};

function query() {
  return storageService.query(NOTES_KEY);
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note);
  else return storageService.post(NOTES_KEY, note);
}

function getEmptyNote() {
  var note = {
    id: null,
    type: "note-txt",
    isPinned: false,
    info: {
      txt: "",
    },
  };
  return note;
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [];
    notes = [
      {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "test!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n1076",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "just a check!",
        },

        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n1098",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "temp text!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n105fdsfs",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem sdfsdfs lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n1056",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem lorem lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n105cxvc",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem xcvcxv lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n105werwe",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem sdfsdfs lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n105vcxxc",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem xcvcx lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n34324056",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem sdfds lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "dsfsd",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem sdfsdsdfcxv lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n105cxvcx6",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem sdfsd lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10sdfdsf56",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "sdfsd lorem lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "cvxvcx",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem lorem lsdfdsforem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "hgdhgf",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem fghfgh lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "sdfsdffscxv",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem lorem xcvcx!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n1fdsfs056",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem lordfcsdfsdem lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10qwewqr56",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lordsfdsem lorem lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10gfddfg56",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "lorem lorem lorem!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n1023",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "vj kd je ks!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10455",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "Fullstack Me Baby!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10324",
        type: "note-img",
        info: {
          url: "https://media.cntraveler.com/photos/5b329f194965ab254448b8e1/master/w_4300,h_2866,c_limit/India_GettyImages-511119924.jpg",
          txt: "Bobi and Me",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n10323434",
        type: "note-video",
        info: {
          url: "https://www.youtube-nocookie.com/embed/tgbNymZ7vqY",
          txt: "Bobi and Me",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n103",
        type: "note-todos",
        info: {
          txt: "Get my stuff together",
          todos: [
            { id: "klsdjf", txt: "Driving liscence", doneAt: null },
            { id: "xcvewre", txt: "Coding power", doneAt: 187111111 },
          ],
        },
        style: {
          backgroundColor: "#00d",
        },
      },
    ];
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function _createNote() {
  const note = {
    id: utilService.makeId(),
  };
  return note;
}
