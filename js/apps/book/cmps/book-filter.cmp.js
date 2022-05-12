export default {
  template: `
        <section class="book-filter">
            <label>
            Search
            <input type="text" id="search" placeholder="Search..." @keyup="setFilter" v-model="filterBy.vendor">
            </label>
            <div class="book-filter-bottom-row">
                    <label class="book-filter-label-from">
                    From
                    <input type="number" id="from" @change="setFilter" v-model="filterBy.fromPrice">
                    </label>
                    <label class="book-filter-label-to">
                    To
                    <input type="number" id="to" @change="setFilter" v-model="filterBy.toPrice">
                    </label>
                    <label class="book-filter-label-max">
                    No Maximum Price
                    <input type="checkbox" name="vehicle1" value="Bike" v-model="filterBy.infinity">
                    </label>
                    </div>
        </section>
    `,
  data() {
    return {
      filterBy: {
        vendor: '',
        fromPrice: 0,
        toPrice: 200,
        infinity: false,
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit('filtered', this.filterBy);
    },
  },
};
