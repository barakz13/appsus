import { utilService } from "../services/util-service.js";
import { router } from "../../../router.js";
import { noteService } from "../services/note.service.js";
export default {
  props: [],
  template: `
    <div class="main-compose-con">
      <div v-if="note" class="add-note-border-compose" :key="noteCon">
        <div class='addnote-con-compose'>
                <div class="compose-title">
                    Add Note
                </div>
                <div class="add-menu-first-con">
                          <div class='add-menu-text'>
                          <textarea class="compose-text" @keyup.enter="addNote" id='text' v-model='note.info.txt'> </textarea>
                          </div>
                </div>
                <div class="add-menu-middle-con">
                </div>
                <div class="addnote-menu-last-con-compose">
                      <span title="Add" @click='addNote' class='add-menu-btn'><i class="fa-solid fa-check"></i></span>
                      <span title="Cancel" @click='closeCompose' class='add-menu-btn'><i class="fa-solid fa-circle-xmark"></i></span>
                </div>
        </div>
      </div>
        {{error}}
    </div>
    `,
  data() {
    return {
        note:null,
        noteCon:0,
      error: null,
      todoItem: "",
      placeHolderMode: true,
    };
  },
  created() {
    if (!this.$route.params.note) return
    var urlStr = this.$route.params.note;
    var params = urlStr.split("&");
    var subject = params[0].split("=")[1];
    var body = params[1].split("=")[1];


    var fullText = subject + "\r" + body
    var noteObj = {
      id: null,
      type: "note-txt",
      isPinned: false,
      info: {
        txt: fullText,
      },
      style: {
        backgroundColor: this.randomNoteColor(),
      },
    };
    this.note = noteObj;
    this.noteCon += 1;

    

  },
  mounted() {},
  computed: {},
  methods: {
    addNote() {
        noteService.save(this.note).then(() => router.push('/keep/'))
    },
    closeCompose() {
        router.push('/keep/')
    },
    randomNoteColor() {
      var colors = [
        "#01BEFE",
        "#FFDD00",
        "#FF7D00",
        "#FF006D",
        "#ADFF02",
        "#8F00FF",
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
