import { loggedinUser } from "../services/mail-service.js";
import { mailService } from "../services/mail-service.js";
import { noteService } from "../../keep/services/note.service.js";

export default {
    props: ['outsideSubject', 'outsideBody'],
    template: `
    <section class="app-main">
        <div class="mail-compose-container">
            <div class="mail-compose">
                <div class="mail-compose-header">
                <h4>New Mail:</h4>
                    <div class="mail-compose-actions">            
                       <button class="btn-send" @click="addMail">Send</button>
                       <router-link class="mail-router-link-back" to="/mail">Back</router-link>
            </div>
                </div>
            <form @submit.prevent class="mail-compose-form">
                <input class="mail-compose-address" type="text" placeholder="To" v-model="mail.address">
                <input class="mail-compose-subject" type="text" placeholder="Subject" v-model="mail.subject">
                <textarea class="mail-compose-body" cols="30" rows="10" v-model="mail.body"></textarea>
            </form>
            </div>   
        </div>
    </section>
    `,
    components: {
        mailService,
        noteService
    },
    created() {
        if (!this.$route.params.note) return
        
        var urlStr = this.$route.params.note
        var params = urlStr.split("&")
        var subject = params[0].split("=")[1]
        var body = params[1].split("=")[1]
        if (subject) this.mail.subject = subject
        if (body) this.mail.body = body
    },
    mounted() {

    },
    data() {
        return {
            mail: {
                fullName: loggedinUser.fullname,
                address: '',
                subject: '',
                body: '',
            },
        }
    },
    methods: {
        addMail() {
            if (!this.mail.address || !this.mail.subject || !this.mail.body) return;
            var newMail = {
                fullName: this.mail.fullName,
                address: this.mail.address,
                subject: this.mail.subject,
                body: this.mail.body,
                isRead: true,
                sentAt: Date.now(),
            }
            mailService.save(newMail)
            this.$router.push('/mail')
        }
    },
    computed: {

    },
    unmounted() { },
}

