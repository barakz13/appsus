import { mailService } from '../services/mail-service.js'


export default {
    template: `
        <section v-if="mail" class="app-main">
            <div class="mail-details-container" >
                <div class="mail-details">
            <div class="mail-details-header">
                <h2 class="mail-details-subject">{{mail.subject}}</h2>
                <div class="mail-details-actions">
                <router-link class="mail-router-link-save" :to="noteUrl">Make Note</router-link>
                <router-link class="mail-router-link-back" to="/mail">Back</router-link>
                </div>
            </div>
            <div class="mail-details-body">
            <p class="mail-from">{{mail.address}}</p>
            <p class="mail-body">{{mail.body}}</p>
            <p class="mail-date">{{mailDate}}</p>
            </div>
            </div>
            </div>
        </section>
        <section v-else class="loading app-main">
            <p>loading</p>
        </section>
    `,
    data() {
        return {
            mail: null
        };
    },
    computed: {
        mailId() {
            return this.$route.params.mailId;
        },
        mailDate() {
            const date = new Date(this.mail.sentAt);
            const humanDateFormat = date.toLocaleString();
            return humanDateFormat;
        },
        noteUrl() {
            return `/keep/compose/subject=${this.mail.subject}&body=${this.mail.body}`
        },
    },
    methods: {
        loadMail() {
            if (!this.mailId) return;
            mailService.get(this.mailId)
                .then(mail => {
                    this.mail = mail
                    this.mail.isRead = true;
                    mailService.save(this.mail)
                });
        },
    },
    watch: {
        mailId: {
            handler() {
                this.loadMail()
            },
            immediate: true
        }
    },
}