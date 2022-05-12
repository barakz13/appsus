import longText from '../cmps/long-text.cmp.js';
import { bookService } from '../services/book-service.js';

export default {
  template: `
        <section v-if="book" class="book-details">
            <img class='book-pic' :src="book.thumbnail">
            <p>{{book.title}}</p>
            <p :class='this.priceLevel'>{{book.listPrice.amount}} {{presentedCoin}}</p>
            <p>{{howLongRead}}</p>
            <p>{{bookAge}}</p>
            <p v-if="this.book.listPrice.isOnSale">SALE!!!!!</p>
            <long-text :desc="currDesc"></long-text>
            <div class="book-details-links">
            <router-link to="/book" @click="$emit('close')">Back</router-link> |
            <router-link :to="'/book/'+book.prevBookId">Prev Book</router-link> | 
            <router-link :to="'/book/'+book.nextBookId">Next Book</router-link>
            </div> 
        </section>
        <section v-else class="loading">
        <img class="loading-img" src="img/loading.png">
        </section>
    `,
  data() {
    return {
      book: null,
    };
  },
  created() {},
  methods: {},
  computed: {
    howLongRead() {
      var count = this.book.pageCount;
      if (count > 500) return 'Long Reading';
      else if (count > 200) return 'Decent Reading';
      else if (count < 100) return 'Light Reading';
    },
    presentedCoin() {
      switch (this.book.listPrice.currencyCode) {
        case 'USD':
          return '$';
        case 'ILS':
          return '₪';
        case 'EUR':
          return 'Є';
      }
    },
    bookAge() {
      var date = this.book.publishedDate;
      var currDate = new Date().getFullYear();
      var diff = currDate - date;
      if (diff > 10) return 'Veteran Book';
      if (diff < 1) return 'New Book!';
    },
    priceLevel() {
      if (this.book.listPrice.amount > 150) return 'book-price-red';
      if (this.book.listPrice.amount < 20) return 'book-price-green';
    },
    currDesc() {
      var text = this.book.description;
      return text;
    },
    bookId() {
      return this.$route.params.bookId;
    },
  },
  components: {
    longText,
  },
  methods: {
    loadBook() {
      if (!this.bookId) return;
      bookService.get(this.bookId).then((book) => (this.book = book));
    },
  },
  watch: {
    bookId: {
      handler() {
        this.loadBook();
      },
      immediate: true,
    },
  },
};
