import noteTxt from "./note-txt.cmp.js";
import noteImg from "./note-img.cmp.js";
import noteVideo from "./note-video.cmp.js";
import noteTodos from "./note-todos.cmp.js";
import noteToolbar from "./note-toolbar.cmp.js";
import notePreview from "./note-preview.cmp.js";
export default {
  emits:['changeColor','pin','unpin','remove','duplicate','email','edit','invertTodo'],
  props: ["data"],
  template: ` 
                <div v-for='note in notes' :key='note.id' :style='noteStyle(note)' class='preview-div'>
                  <note-preview :note='note' @changeColor='changeColorEvt' @pin='pinEvt' @unpin='unpinEvt' @remove='removeEvt' @duplicate='duplicateEvt' @email='emailEvt' @edit='editEvt' @invertTodo='inverTodoEvt' />
                </div>

    `,
  data() {
    return {
      notes: this.data,
    };
  },
  created() {
  },
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
    noteToolbar,
    notePreview,
  },
  methods: {
    turnOffMenu() {
      if (this.toolbarShow === false) return;
      this.toolbarShow = false;
    },
    turnOnMenu() {
      if (this.toolbarShow === true) return;
      this.toolbarShow = true;
    },
    inverTodoEvt(note,todo) {
      this.$emit('invertTodo',note,todo)
    },
    noteStyle(note) {
      return "background-color:" + note.style.backgroundColor + ";";
    },
    editEvt(note) {
      this.$emit("edit", note);
    },
    changeColorEvt(note, noteColor) {
      this.$emit("changeColor", note, noteColor);
    },
    pinEvt(note) {
      this.$emit("pin", note);
    },

    unpinEvt(note) {
      this.$emit("unpin", note);
    },

    removeEvt(note) {
      this.$emit("remove", note);
    },

    duplicateEvt(note) {
      this.$emit("duplicate", note);
    },

    emailEvt(note) {
      this.$emit("email", note);
    },
  },
  computed: {
    getNoteStyle(note) {
      if (!note.style.backgroundColor) return;
      return `background-color:${note.style.backgroundColor}`;
    },
  },
};
