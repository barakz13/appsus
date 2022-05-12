import mailPreview from '../cmps/mail-preview.cmp.js';
import { mailService } from '../services/mail-service.js';

export default {
  emits: ['remove', 'updateUnreadCounter'],
  props: ['mails'],
  template: `
        <section class="mail-inbox-section">
            <table>
                <tbody>
                    <tr v-for="mail in mails" :key="mail.id" class="mail-preview-container">
                    <mail-preview :mail="mail" @updateUnreadCounter="updateUnreadCounter"/>
                    <div class="mail-preview-actions">
                    <button class="btn-delete" @click="remove(mail.id)" title="Remove"><i class="fa-solid fa-trash"></i></button>
            </div>
                    </tr>
                </tbody>
            </table>
        </section>
    `,
  data() {
    return {
      checkBoxStatus: null,
    };
  },
  components: {
    mailPreview,
    mailService,
  },
  methods: {
    remove(id) {
      this.$emit('remove', id);
    },
    updateUnreadCounter(mail) {
      this.$emit('updateUnreadCounter', mail);
    },
  },
  created() {},
  computed: {},
};
