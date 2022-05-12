import noteTxt from '../apps/keep/cmps/note-txt.cmp.js';
import noteImg from '../apps/keep/cmps/note-img.cmp.js';
import noteVideo from '../apps/keep/cmps/note-video.cmp.js';
import noteTodos from '../apps/keep/cmps/note-todos.cmp.js';
import noteList from '../apps/keep/cmps/note-list.cmp.js';
import { noteService } from '../apps/keep/services/note.service.js';
import noteFilter from '../apps/keep/cmps/note-filter.cmp.js';
import { storageService } from '../apps/keep/services/async-storage-service.js';
import { utilService } from '../apps/keep/services/util-service.js';
import noteAdd from '../apps/keep/cmps/note-add.cmp.js';
import noteEdit from '../apps/keep/views/note-edit.cmp.js';
import { router } from '../router.js';
import noteCompose from '../apps/keep/views/note-compose.cmp.js';
export default {
  props: [],
  template: `
            <div class="top-section-con">
              <div class="top-section">
                              <div class="note-edit-con">
                                        <!-- edit note -->
                                        <note-edit v-if='currWindow==="editNote" && selectedNote' :noteId="noteEditId" @closeEdit="currWindow='main'" @saveChanges='saveChangesEvt' @invertTodo='inverTodoEvt' @removeTodo='removeTodoEvt' :key='noteEditKey'/>
                              </div>
                              <div>
                                            <!-- add note -->
                                            <note-add v-if='currWindow==="addNote"' @closeAdd='currWindow = "main"' @addNote='addNoteEvt' />
                              </div>
                              <div class="note-filter-border" div v-if='currWindow==="main"' >
                                  <div class="filter-menu">
                                      <!-- note filter -->
                                      <div>
                                                <note-filter @search="searchEvt" />
                                      </div>
                                      <div>
                                                 <!-- add note button -->
                                                <span v-if='currWindow==="main"' class="add-menu-btn" title="Create Note" @click='currWindow="addNote"'><i class="fa-solid fa-circle-plus"></i></span>
                                      </div>
                                  </div>
                              </div>
              </div>
            </div>
            <div class='bottom-section'>
            
                      <!-- pinned search result-->
                      <div class="user-list-main-con">
                          <!-- <div>Pinned Notes</div> -->
                          <div class='user-list-con' ref="boxCon1">
                              <note-list v-if='pinnedNotesSearchResult' :data='pinnedNotesSearchResult' :key='pinnedListKey' @changeColor='changeColorEvt' @pin='pinEvt' @unpin='unpinEvt' @remove='removeEvt' @duplicate='duplicateEvt' @email='emailEvt' @edit='editEvt' @invertTodo='inverTodoEvt'/>
                          </div>
                      </div>
                      <!-- search result regular -->
            
                      <div class="user-list-main-con">
                          <!-- <div>Other Notes</div> -->
                          <div class='user-list-con' ref="boxCon1">
                            <note-list v-if='regularNotesSearchResult' :data='regularNotesSearchResult' :key='regularListKey' @changeColor='changeColorEvt' @pin='pinEvt' @unpin='unpinEvt' @remove='removeEvt' @duplicate='duplicateEvt' @email='emailEvt' @edit='editEvt' @invertTodo='inverTodoEvt'/>
                          </div>
                      </div>
            </div>
        
    `,
  mounted() {
    noteService.query().then((notes) => {
      this.notes = notes;
      this.filterNotes();
    });
  },
  created() {
    window.addEventListener('resize', this.keepappResize);
    if (this.$refs.boxCon1) {
    }
  },
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
    noteList,
    noteFilter,
    noteAdd,
    noteEdit,
    noteCompose,
  },
  data() {
    return {
      currWindow: 'main',
      pinnedNotesSearchResult: null,
      regularNotesSearchResult: null,
      notes: null,
      noteEditId: null,
      selectedNote: null,
      filterByType: null,
      filterByTerm: null,
      regularListKey: 0,
      pinnedListKey: 0,
      noteEditKey: 0,
    };
  },
  methods: {
    keepappResize() {
      var currWidth = window.innerWidth;
      if (currWidth < 1300) {
      }
    },
    removeTodoEvt(note, todo) {
      var foundIdx = note.info.todos.findIndex(
        (currTodo) => currTodo.id === todo.id
      );
      note.info.todos.splice(foundIdx, 1);

      noteService.save(note).then(() => (this.noteEditKey += 1));
    },
    saveChangesEvt(note) {
      this.currWindow = 'main';
      noteService.save(note).then(() => this.updateNotes());
    },
    inverTodoEvt(note, todo) {
      var foundIdx = note.info.todos.findIndex(
        (currTodo) => currTodo.id === todo.id
      );
      if (!note.info.todos[foundIdx].doneAt)
        note.info.todos[foundIdx].doneAt = Date.now();
      else note.info.todos[foundIdx].doneAt = null;

      noteService.save(note).then(() => (this.noteEditKey += 1));
      // .then(() => this.updateNotes());
    },
    editEvt(note) {
      this.noteEditId = note.id;
      this.selectedNote = note;
      this.currWindow = 'editNote';
      this.noteEditKey += 1;
    },
    addNoteEvt(addDetails) {
      this.currWindow = 'main';
      var note = noteService.getEmptyNote();

      //   background color
      note.style = {};
      note.style.backgroundColor = this.randomNoteColor();

      //   type
      note.type = addDetails.noteType;

      //text
      note.info.txt = addDetails.txt;

      //if video/img txt=url, title=txt
      if (
        addDetails.noteType === 'note-video' ||
        addDetails.noteType === 'note-img'
      ) {
        note.info.txt = addDetails.title;
        note.info.url = addDetails.txt;
      }

      if (addDetails.noteType === 'note-todos') {
        note.info.todos = addDetails.todoItemList;
      }
      this.filterByTerm = '';
      noteService.save(note).then(() => this.updateNotes());
    },
    updateNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
        this.filterNotes();
      });
    },
    searchEvt(cfilterByTerm, cfilterByType) {
      this.filterByType = cfilterByType;
      this.filterByTerm = cfilterByTerm;
      this.filterNotes();
    },
    testApp() {
      noteService.get('n105cxvc').then();
    },
    changeColorEvt(note, noteColor) {
      note.style.backgroundColor = noteColor;
      noteService.save(note).then(() => this.updateNotes());
    },
    //v
    pinEvt(note) {
      note.isPinned = true;

      noteService.save(note).then(() => this.updateNotes());
    },
    //v
    unpinEvt(note) {
      note.isPinned = false;
      noteService.save(note).then(() => this.updateNotes());
    },
    //v
    removeEvt(note) {
      noteService.remove(note.id).then(() => this.updateNotes());
    },
    //v
    duplicateEvt(note) {
      var dupNote = JSON.parse(JSON.stringify(note));
      dupNote.id = null;
      noteService.save(dupNote).then(() => this.updateNotes());
    },

    emailEvt(note) {
      var subject = 'my note';
      var body;
      if (note.type === 'note-txt') {
        body = note.info.txt;
      }
      if (note.type === 'note-img') {
        subject = note.info.txt;
        body = note.info.url;
      }
      if (note.type === 'note-video') {
        subject = note.info.txt;
        body = note.info.url;
      }
      if (note.type === 'note-todos') {
        subject = note.info.txt;
        body = note.info.todos.map((todo) => todo.txt).join('\n');
      }
      var url = '/mail/compose/';
      var urlAndParams = `${url}subject=${subject}&body=${body}`;

      router.push({ path: '/keep', params: '' });
    },
    filterNotes() {
      if (!this.filterByTerm || this.filterByTerm === '') {
        this.regularNotesSearchResult = this.notes.filter(
          (noteData) => !noteData.isPinned
        );
        this.pinnedNotesSearchResult = this.notes.filter(
          (noteData) => noteData.isPinned
        );
        this.regularListKey += 1;
        this.pinnedListKey += 1;
        return;
      }
      const regTest = new RegExp(this.filterByTerm, 'i');
      var foundNotes = this.notes.filter((note) => {
        if (this.filterByType === 'all' || this.filterByType === note.type) {
          if (regTest.test(note.info.txt)) return true;
        }
        if (
          (note.type === 'note-todos' && this.filterByType === 'all') ||
          (note.type === 'note-todos' && this.filterByType === 'note-todos')
        ) {
          if (regTest.test(note.info.txt)) return true;
          var foundItems = note.info.todos.filter((todo) =>
            regTest.test(todo.txt)
          );
          if (foundItems.length > 0) return true;
        }
      });
      this.regularNotesSearchResult = foundNotes.filter(
        (noteData) => !noteData.isPinned
      );
      this.pinnedNotesSearchResult = foundNotes.filter(
        (noteData) => noteData.isPinned
      );
      this.regularListKey += 1;
      this.pinnedListKey += 1;
    },
    randomNoteColor() {
      var colors = [
        '#01BEFE',
        '#FFDD00',
        '#FF7D00',
        '#FF006D',
        '#ADFF02',
        '#8F00FF',
      ];
      return colors[this.getRandomIntInclusive(0, colors.length - 1)];
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    },
  },
};
