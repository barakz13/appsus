export default {
  emits: ['filtered'],
  template: `
        <section class="mail-filter">
            <input class="mail-search" type="text" placeholder="Search..." @keyup="setFilter" v-model="filterBy.subject">
            <div class="read-unread-div">
            <select class="read-unread-select" @change="setReadUnread($event)">
                <option value="null">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
            </div>
        </section>
    `,
  data() {
    return {
      filterBy: {
        subject: '',
        isRead: null,
      },
    };
  },
  methods: {
    setReadUnread(event) {
      this.filterBy.isRead = JSON.parse(event.target.value);
      this.$emit('filtered', this.filterBy);
    },
    setFilter() {
      this.$emit('filtered', this.filterBy);
    },
  },
};
