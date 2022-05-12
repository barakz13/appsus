export default {
  emits: ['updateUnreadCounter'],
  props: ['mail'],
  template: `
        <section class="mail-preview-details">
        <input class="read-unread-checkbox" title="Read/Unread" type="checkbox" @click="readUnread()" v-model="isChecked">
        <router-link class="mail-details-router" :to="'/mail/'+mail.id">
            <div class="mail-preview-subject">
            <h3>{{editSubjectLength}}</h3>
            <p class="read-unread" title="Read" v-if="mail.isRead">✓</p>
            </div>
            <p class="mail-preview-address">{{editAddressLength}}</p>
            <p class="mail-preview-date">{{mailDate}}</p>

        </router-link>
        </section>
    `,
  data() {
    return {
      isChecked: false,
    };
  },
  created() {
    if (this.mail.isRead) this.isChecked = true;
  },
  methods: {
    readUnread() {
      this.mail.isRead = !this.isChecked;
      this.$emit('updateUnreadCounter', this.mail);
    },
  },
  computed: {
    editSubjectLength() {
      var editedSubject = this.mail.subject.substr(0, 15);
      if (this.mail.subject.length >= 16) {
        editedSubject += '..';
      }
      return editedSubject;
    },
    editAddressLength() {
      var editedAddress = this.mail.address.substr(0, 8);
      editedAddress += '..';
      return editedAddress;
    },
    mailDate() {
      const date = new Date(this.mail.sentAt);
      const humanDateFormat = date.toLocaleString();
      return humanDateFormat;
    },
  },
};
