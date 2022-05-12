//REPLICATE
import { storageService } from './async-storage-service.js';
import { utilService } from './util-service.js';
const NOTES_KEY = 'notes';
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
    type: 'note-txt',
    isPinned: false,
    info: {
      txt: '',
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
        id: 'Pp6o7Ei0',
        type: 'note-img',
        isPinned: false,
        info: {
          txt: 'israel',
          url: 'https://www.planetware.com/wpimages/2019/12/israel-in-pictures-beautiful-places-to-photograph-jerusalem.jpg',
        },
        style: { backgroundColor: '#01BEFE' },
      },
      {
        id: 'bXT3NhMy',
        type: 'note-img',
        isPinned: false,
        info: {
          txt: 'Trip last year',
          url: 'https://cdn.theculturetrip.com/wp-content/uploads/2015/06/shutterstock_554381647-650x439.jpg',
        },
        style: { backgroundColor: '#FF006D' },
      },
      {
        id: 'D7j7Gdb9',
        type: 'note-img',
        isPinned: false,
        info: {
          txt: 'vacation',
          url: 'https://globalgrasshopper.com/wp-content/uploads/2015/08/sea-of-Galliee.jpg',
        },
        style: { backgroundColor: '#FFDD00' },
      },
      {
        id: 'YfZXDLWz',
        type: 'note-txt',
        isPinned: false,
        info: {
          txt: 'Happiness is like a sunbeam, which the least shadow intercepts, while adversity is often as the rain in the spring.',
        },
        style: { backgroundColor: '#FFDD00' },
      },
      {
        id: 'xno7VYY0',
        type: 'note-txt',
        isPinned: false,
        info: {
          txt: 'Yesterday is but a dream, tomorrow but a vision. But today well lived makes every yesterday a dream of happiness, and every tomorrow a vision of hope. Look well, therefore, to this day.',
        },
        style: { backgroundColor: '#FF7D00' },
      },
      {
        id: 'sJnPAzJS',
        type: 'note-txt',
        isPinned: false,
        info: { txt: 'Where there is laughter happiness likes to be.' },
        style: { backgroundColor: '#ADFF02' },
      },
      {
        id: 'AMQMf7X6',
        type: 'note-txt',
        isPinned: false,
        info: {
          txt: ' If you want happiness for an hour — take a nap. If you want happiness for a day — go fishing. If you want happiness for a month — get married. If you want happiness for a year — inherit a fortune. If you want happiness for a lifetime — help someone else.',
        },
        style: { backgroundColor: '#FF006D' },
      },
      {
        id: 'Ynh73Fxm',
        type: 'note-txt',
        isPinned: false,
        info: {
          txt: 'Real happiness is found not in doing the things you like to do, but in liking the things you have to do.',
        },
        style: { backgroundColor: '#01BEFE' },
      },
      {
        id: 'wxnx7WN3',
        type: 'note-todos',
        isPinned: false,
        info: {
          txt: 'grocery shop',
          todos: [
            { id: 'QUlNVsBc', txt: 'bread', doneAt: null },
            { id: '4TvbsTbS', txt: 'eggs', doneAt: null },
            { id: 'pscuqX5m', txt: 'milk', doneAt: null },
          ],
        },
        style: { backgroundColor: '#FF7D00' },
      },
      {
        id: 'XeMVz3h2',
        type: 'note-video',
        isPinned: false,
        info: {
          txt: 'video',
          url: 'https://www.youtube-nocookie.com/embed/tgbNymZ7vqY',
        },
        style: { backgroundColor: '#ADFF02' },
      },
      {
        id: 'i3mUfYcQ',
        type: 'note-todos',
        isPinned: false,
        info: {
          txt: 'Good habits',
          todos: [
            { id: 'EUICeR2x', txt: 'Follow a morning routine', doneAt: null },
            { id: 'iV6kz0tf', txt: 'Create a daily to-do list', doneAt: null },
            {
              id: '6z4ORjhn',
              txt: 'Track productivity numbers daily',
              doneAt: null,
            },
          ],
        },
        style: { backgroundColor: '#8F00FF' },
      },
      {
        id: 'UzO4C1Ya',
        type: 'note-txt',
        isPinned: false,
        info: { txt: 'A good neighbor is better than a brother far off' },
        style: { backgroundColor: '#FFDD00' },
      },
      {
        id: 'tNIyGWcW',
        type: 'note-txt',
        isPinned: false,
        info: { txt: 'Don’t count your chickens before they’re hatched' },
        style: { backgroundColor: '#01BEFE' },
      },
      {
        id: 'uL989tRD',
        type: 'note-txt',
        isPinned: false,
        info: { txt: 'When in Rome, do as the Romans' },
        style: { backgroundColor: '#FFDD00' },
      },
      {
        id: 'cLRbjPGP',
        type: 'note-txt',
        isPinned: false,
        info: { txt: 'If you want to be respected, you must respect yourself' },
        style: { backgroundColor: '#FF7D00' },
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
