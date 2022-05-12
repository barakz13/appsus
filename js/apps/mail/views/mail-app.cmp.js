import { mailService } from "../services/mail-service.js";
import mailInbox from "../cmps/mail-inbox.cmp.js";
import mailFilter from "../cmps/mail-filter.cmp.js"
import mailFolderList from "../cmps/mail-folder-list.cmp.js"

export default {
  template: `
        <section class="app-main mail-main">
          <div class="main-options">
          <div class="filters">          
              <mail-filter @filtered="setMainFilter"/>
              <mail-folder-list @folderSelected="setSideFilter" />
          </div>
          <div class="misc">
          <select class="select-sort" @change="sortMails" v-model="sortBy">
                <option value="date">Date</option>
                <option value="title">Title</option>
            </select>
          <p>Total Unread Mails: {{counter}}</p>
          </div>
          <router-link class="btn-compose" to="/mail/compose" title="Compose">+</router-link>
          </div>
          <mail-inbox :mails="filterMails" @remove="removeMail" @updateUnreadCounter="updateUnreadCounter"/>
        </section>
    `,
  components: {
    mailInbox,
    mailFilter,
    mailFolderList,
  },
  data() {
    return {
      mails: null,
      filterBy: null,
      optionSelected: null,
      counter: 0,
      sortBy: 'date'
    };
  },
  methods: {
    updateUnreadCounter(mail) {
      mailService.save(mail).then(() => this.unreadCounter())
    },
    setMainFilter(filterBy) {
      this.filterBy = filterBy;
    },
    setSideFilter(optionSelected) {
      this.optionSelected = optionSelected;
    },
    removeMail(id) {
      mailService.remove(id)
        .then(() => {
          const idx = this.mails.findIndex(mail => mail.id === id)
          this.mails.splice(idx, 1);
          this.counter = 0;
          this.unreadCounter();
        })
    },
    unreadCounter() {
      this.counter = 0;
      this.mails.forEach((mail) => {
        if (!mail.isRead) {
          this.counter++;
        }
      });
    },
    sortMails() {
      if (this.sortBy === 'date') {
        for (let i = 0; i < this.mails.length; i++) {
          for (let j = 1; j < this.mails.length; j++) {
            if (this.mails[j].sentAt < this.mails[j - 1].sentAt) {
              var temp = this.mails[j]
              this.mails[j] = this.mails[j - 1]
              this.mails[j - 1] = temp
            }
            else if (this.mails[j].sentAt === this.mails[j - 1].sentAt) {
              if (this.mails[j].subject < this.mails[j - 1].subject) {
                var temp = this.mails[j]
                this.mails[j] = this.mails[j - 1]
                this.mails[j - 1] = temp
              }
            }
          }
        }
      }
      else {
        for (let i = 0; i < this.mails.length; i++) {
          for (let j = 1; j < this.mails.length; j++) {
            if (this.mails[j].subject < this.mails[j - 1].subject) {
              var temp = this.mails[j]
              this.mails[j] = this.mails[j - 1]
              this.mails[j - 1] = temp
            }
          }
        }
      }
    },
  },
  created() {
    mailService.query()
      .then(mails => {
        this.mails = mails;
        this.unreadCounter();
        this.sortMails()
      })
  },
  computed: {
    filterMails() {
      if (!this.filterBy) return this.mails;
      if (this.filterBy.subject === '') {
        if (this.filterBy.isRead === null) return this.mails;
        else if (this.filterBy.isRead === false) {
          return this.mails.filter((mail) => {
            if (!mail.isRead) {
              return true;
            }
          })
        }
        else {
          return this.mails.filter((mail) => {
            if (mail.isRead) {
              return true;
            }
          })
        }
      }
      else {
        const regex = new RegExp(this.filterBy.subject, "i");
        if (this.filterBy.isRead === null) {
          return this.mails.filter((mail) => {
            if (regex.test(mail.subject)) {
              return true;
            }
          })
        }
        else if ((this.filterBy.isRead === false)) {
          return this.mails.filter((mail) => {
            if (regex.test(mail.subject) && !mail.isRead) {
              return true;
            }
          })
        }
        else {
          return this.mails.filter((mail) => {
            if (regex.test(mail.subject) && mail.isRead) {
              return true;
            }
          })
        }
      }

    }
  }
}

