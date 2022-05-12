import { utilService } from '../services/util-service.js';
export default {
  emits: ['addNote', 'closeAdd'],
  props: ['data'],
  template: `
      <div class="add-note-border">
        <div class='addnote-con'>
                <div class="add-menu-first-con">
                          <div class='add-menu-text'>
                          <input class="main-text add-note-text" ref='mainText' @keyup.enter="addNote" type=text id='text' v-model='addDetails.txt' :placeholder='mainPlaceHolderText()'/>
                          </div>
                          <div>
                            <input v-if='titleShow()' @keyup.enter="addNote" type=text id='video-img-title' v-model='addDetails.title' :placeHolder='subPlaceHolderText()' class="main-text">
                          </div>
                          <div class="add-menu-todo-menu">
                                  <input v-if='addDetails.noteType === "note-todos"' @keyup.enter="addTodo" type=text id='todo-item' v-model='todoItem' placeHolder='enter mission to add'>
                                  <button title="Add Mission" v-if='addDetails.noteType === "note-todos"' @click="addTodo"><i class="fa-solid fa-check"></i></button>
                          </div>
                </div>
                <div class="add-menu-middle-con">
                </div>
                <div class="addnote-menu-last-con">
                <span title="Text" class='add-menu-btn' @click='changeNoteType("note-txt")'><i class="fa-solid fa-text-size">T</i></span>
                      <span title="Video" class='add-menu-btn' @click='changeNoteType("note-video")'><i class="fa-solid fa-video"></i></span>
                      
                      <span title="Picture" class='add-menu-btn' @click='changeNoteType("note-img")'><i class="fa-solid fa-image"></i></span>
                      <span title="List" class='add-menu-btn' @click='changeNoteType("note-todos")'><i class="fa-solid fa-list-check"></i></span>
                      <span title="Add" @click='addNote' class='add-menu-btn'><i class="fa-solid fa-check"></i></span>
                      <span title="Cancel" @click='this.$emit("closeAdd")' class='add-menu-btn'><i class="fa-solid fa-circle-xmark"></i></span>
                </div>
        </div>
      </div>
        {{error}}
    `,
  data() {
    return {
      addDetails: {
        txt: null,
        title: null,
        noteType: 'note-txt',
        todoItemList: [],
      },
      error: null,
      todoItem: '',
      placeHolderMode: true,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    addNote() {
      if (!this.addDetails.txt) return;
      this.$emit('addNote', this.addDetails);
    },
    validateForm() {
      var validateFormObj = {
        answer: true,
        desc: null,
      };
      var descText;
      // if (addDetails.noteType === 'note-todo') descText = 'note'
      // if (!this.txt) return { answer:false , desc:"enter "}
    },
    addTodo() {
      if (!this.todoItem) return;
      var todoItemObj = {
        id: utilService.makeId(),
        txt: this.todoItem,
        doneAt: null,
      };
      this.addDetails.todoItemList.push(todoItemObj);
      this.todoItem = '';
    },
    changeNoteType(type) {
      this.addDetails.noteType = type;
    },

    mainPlaceHolderText() {
      if (this.addDetails.noteType === 'note-txt') return 'Enter note text...';
      if (this.addDetails.noteType === 'note-video')
        return 'Enter video url...';
      if (this.addDetails.noteType === 'note-img') return 'Enter img url...';
      if (this.addDetails.noteType === 'note-todos')
        return 'Enter to do list title...';
    },
    subPlaceHolderText() {
      if (this.addDetails.noteType === 'note-video')
        return 'Enter video title...';
      if (this.addDetails.noteType === 'note-img') return 'Enter img title...';
    },
    titleShow() {
      if (this.addDetails.noteType === 'note-video') return true;
      if (this.addDetails.noteType === 'note-img') return true;
      else return false;
    },
  },
};
