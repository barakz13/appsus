import { bookService } from '../services/book-service.js';

export default {
    template: `
    
        <section class="book-edit">
            <h4>Add book</h4>
            <form @submit.prevent="save">
                <input type="text" v-model="bookToEdit.vendor" placeholder="Vendor">
                <input type="number" v-model.number="bookToEdit.maxSpeed" placeholder="Max speed">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptyBook()
        };
    },
    methods: {
        save() {
            if (!this.bookToEdit.vendor) return;
            const book = bookService.save(this.bookToEdit);
            this.$emit('saved', book);
            this.bookToEdit = bookService.getEmptyBook()
        }
    }
};