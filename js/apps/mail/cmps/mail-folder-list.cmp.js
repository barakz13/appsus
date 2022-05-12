export default {
  emits: ['folderSelected'],
  template: `
        <section class="mail-folder-list">
            <select class="mail-folder-list-select" @change="switchSelect($event)">
                <option value="inbox">Inbox</option>
                <option value="sent">Sent</option>
                <option value="trash">Trash</option>
                <option value="draft">Draft</option>
            </select>
        </section>
    `,
  data() {
    return {
      optionSelected: '',
    };
  },
  created() {},
  methods: {
    switchSelect(event) {
      this.optionSelected = event.target.value;
      this.$emit('folderSelected', this.optionSelected);
    },
  },
};
