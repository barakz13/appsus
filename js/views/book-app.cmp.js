import { bookService } from '../apps/book/services/book-service.js';
import bookFilter from '../apps/book/cmps/book-filter.cmp.js';
import bookList from '../apps/book/cmps/book-list.cmp.js';
import bookEdit from '../apps/book/views/book-edit.cmp.js';

export default {
  template: `
        <section class="book-app">
           <book-filter @filtered="setFilter" />
           <book-list :books="booksForDisplay" @remove="removeBook"/>
        </section>
    `,
  components: {
    bookFilter,
    bookList,
    bookEdit,
  },
  data() {
    return {
      books: null,
      filterBy: null,
    };
  },
  created() {
    bookService.query().then((books) => (this.books = books));
  },
  methods: {
    removeBook(id) {
      bookService.remove(id).then(() => {
        const idx = this.books.findIndex((book) => book.id === id);
        this.books.splice(idx, 1);
      });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
      console.log(this.filterBy);
    },
  },
  computed: {
    booksForDisplay() {
      if (!this.filterBy) return this.books;
      const regex = new RegExp(this.filterBy.vendor, 'i');
      return this.books.filter((book) => {
        if (regex.test(book.title)) {
          if (book.listPrice.amount >= this.filterBy.fromPrice) {
            if (this.filterBy.infinity) {
              return true;
            }
            if (book.listPrice.amount <= this.filterBy.toPrice) {
              return true;
            }
          }
        }
      });
    },
  },
};
