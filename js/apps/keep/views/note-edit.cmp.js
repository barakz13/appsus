import { storageService } from '../services/async-storage-service.js';
import { noteService } from '../services/note.service.js';
import { utilService } from '../services/util-service.js';

export default {
  emits: ['saveChanges', 'invertTodo', 'closeEdit'],
  props: ['noteId'],
  template: `

                  <!-- txt view -->
                  <div v-if='txtView' class="preview-div-edit-text">
                      <div>
                                <input v-if="note" class="main-text" type=text v-model='note.info.txt' @keyup.enter='$emit("saveChanges",note)'>
                      </div>
                      <div class="note-edit-firstline-btns">
                                <span title="Save All" class="add-menu-btn" @click='$emit("saveChanges",note)'><i class="fa-solid fa-check"></i></span>
                                <span title="Cancel" class="add-menu-btn" @click='$emit("closeEdit")'><i class="fa-solid fa-circle-xmark"></i></span>
                      </div>
                  </div>
                  <!-- video view -->
                  <div v-if='videoView' class="preview-div-edit">
                            <div class="note-edit-video-firstline main-text">
                                        <div>
                                                    <div><input v-if="note" title="Video Title" class="main-text" type=text v-model='note.info.txt' @keyup.enter='$emit("saveChanges",note)'></div>
                                        </div>
                                        <div class="note-edit-firstline-btns">
                                                    <span title="Save all" class="add-menu-btn" @click='$emit("saveChanges",note)'><i class="fa-solid fa-check"></i></span>
                                                    <span title="Cancel" class="add-menu-btn" @click='$emit("closeEdit")'><i class="fa-solid fa-circle-xmark"></i></span>
                                        </div>
                            </div>
                      
                            <div>
                                        <input v-if="note" class="main-text" type=text v-model='note.info.url' @keyup.enter='$emit("saveChanges",note)'>
                            </div>
                            <div>
                                        <iframe width="100%" height="100%" :src="note.info.url">
                                        </iframe>
                            </div>
                  </div>

                  <!-- img view -->
                  <div v-if='imgView' class="preview-div-edit">
                      
                          <div class="note-edit-img-firstline">
                                  <div>
                                             <input class="main-text" type=text v-model='note.info.txt' title="Image Title" @keyup.enter='$emit("saveChanges",note)'>
                                  </div>
                                  <div class="note-edit-firstline-btns">
                                              <span title="Save All" class="add-menu-btn" @click='$emit("saveChanges",note)'><i class="fa-solid fa-check"></i></span>
                                              <span title="Cancel" class="add-menu-btn" @click='$emit("closeEdit")'><i class="fa-solid fa-circle-xmark"></i></span>
                                  </div>

                          </div>
                      <div><input class="main-text" type=text v-model='note.info.url' @keyup.enter='$emit("saveChanges",note)'  ></div>
                      <img class='note-img-edit' :src='note.info.url'>

                  </div>

                  <!-- todos view -->
                  <div v-if='todosView' class="preview-div-edit">
                  <div>
                          <div class="note-edit-todo-firstline">
                                      <div class="note-edit-todo-text">
                                              <input v-model="note.info.txt" title="Label" class="main-text" type=text @keyup.enter='$emit("saveChanges",note)'>
                                      </div>
                                      
                                      <div class="note-edit-firstline-btns">
                                                    <span title="Save All" class="add-menu-btn" @click='$emit("saveChanges",note)'><i class="fa-solid fa-check"></i></span>
                                                    <span title="Cancel" class="add-menu-btn" @click='$emit("closeEdit")'><i class="fa-solid fa-circle-xmark"></i></span>
                                      </div>
                          </div>
                              <div class="note-edit-todos-add">
                                  <input type=text class="main-text note-edit-todo-text-second" id='todo-item' v-model='todoItem' placeHolder='add mission' @keyup.enter='addTodo'>
                                  <span title="Add Mission" class="add-menu-btn" @click="addTodo"><i class="fa-solid fa-check"></i></span>
                              </div>
                      <div class="todo-edit-item">&nbsp;</div>
                      <span class="todo-edit-item">Todo:</span>
                      <ul class="note-edit-todos-list ul-style">
                          <li v-for='todo in note.info.todos' :key='todo.id'>
                              <div class="note-edit-todos-add">
                                  
                                  <span class="todo-edit-item" id='todo-item' v-model='todoItem' placeHolder='add mission'>{{todo.txt}}</span>
                                  <span class="add-menu-btn vmark" @click='removeTodo(note,todo)'>&nbsp;&nbsp;<i class="fa-solid fa-circle-xmark"></i></span>
                              </div>
                          </li>
                      </ul>
                  </div>

                  <!-- <span :style='todoStyle(todo)' @click="inverttodo(note,todo)">txt: {{todo.txt}}</span> -->
    `,
  data() {
    return {
      note: null,
      txtView: false,
      videoView: false,
      imgView: false,
      todosView: false,
      multiView: false,
      todoItem: '',
    };
  },
  created() {
    noteService.get(this.noteId).then((noteData) => {
      this.note = noteData;
      this.noteCon += 1;
      this.viewUpdate();
    });
  },
  computed: {},
  methods: {
    addTodo() {
      if (!this.todoItem) return;
      var todoItemObj = {
        id: utilService.makeId(),
        txt: this.todoItem,
        doneAt: null,
      };
      if (!this.note.info.todos) this.note.info.todos = [];
      this.note.info.todos.push(todoItemObj);
      this.todoItem = '';
    },
    removeTodo(note, todo) {
      var foundIdx = this.note.info.todos.findIndex(
        (currTodo) => currTodo.id === todo.id
      );
      if (!foundIdx) return;
      this.note.info.todos.splice(foundIdx, 1);
    },
    inverttodo(note, todo) {
      this.$emit('invertTodo', note, todo);
    },
    viewUpdate() {
      this.txtView = this.note.type === 'note-txt';
      this.videoView = this.note.type === 'note-video';
      this.imgView = this.note.type === 'note-img';
      this.todosView = this.note.type === 'note-todos';
    },
    todoStyle(todo) {
      if (todo.doneAt) {
        return 'text-decoration: line-through;';
      } else {
        return 'text-decoration: none;';
      }
    },
  },
};
