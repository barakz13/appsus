import noteTxt from './note-txt.cmp.js';
import noteImg from './note-img.cmp.js';
import noteVideo from './note-video.cmp.js';
import noteTodos from './note-todos.cmp.js';
import noteToolbar from './note-toolbar.cmp.js';

export default {
  emits: [
    'changeColor',
    'pin',
    'unpin',
    'remove',
    'duplicate',
    'email',
    'edit',
    'invertTodo',
  ],
  props: ['note'],
  template: `
                <div class='note-preview-item'  @mouseover="turnOnMenu()" @mouseleave="turnOffMenu()">
                    <div class='note-preview-item-top'>
                    <component :is="note.type" :data='note' @invertTodo='inverTodoEvt'></component>
                    </div>
                      <div class='note-preview-item-bottom' style="background-color:;">
                      <Transition name="slide-fade">
                        <div v-show='toolbarShow' class='toolbar'>
                          <span class='tool-bar-btn' title="Color" @click='showColorPick'>🎨<input v-model='noteColor' @change="changeColor" ref='colorChoose' type="color" class='input-colorpicker'></span>
                          <span v-if="!note.isPinned" title="Pin" class='tool-bar-btn' @click='pin'>📌</span>
                          <span v-if="note.isPinned" title="Unpin" class='tool-bar-btn' @click='unpin'>🔽</span>
                          <span class='tool-bar-btn' title="Remove" @click='remove'>🗑️</span>
                          <span class='tool-bar-btn' title="Duplicate" @click='duplicate'>📝</span>
                          <span class='tool-bar-btn' title="Email this" @click='email'>📧</span>
                          <span class='tool-bar-btn' title="Edit" @click='edit'>✏️</span>
                        </div>
                      </Transition>
                      </div>
                </div>
    `,
  data() {
    return {
      toolbarShow: false,
      noteColor: '#000000',
    };
  },
  created() {},
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
    noteToolbar,
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
    inverTodoEvt(note, todo) {
      this.$emit('invertTodo', note, todo);
    },
    noteStyle(note) {
      return 'background-color:' + note.style.backgroundColor + ';';
    },
    edit() {
      this.$emit('edit', this.note);
    },
    showColorPick() {
      this.$refs.colorChoose.click();
    },
    changeColor() {
      this.$emit('changeColor', this.note, this.noteColor);
    },
    pin() {
      this.$emit('pin', this.note);
    },

    unpin() {
      this.$emit('unpin', this.note);
    },

    remove() {
      this.$emit('remove', this.note);
    },

    duplicate() {
      this.$emit('duplicate', this.note);
    },

    email() {
      this.$emit('email', this.note);
    },
  },
};
