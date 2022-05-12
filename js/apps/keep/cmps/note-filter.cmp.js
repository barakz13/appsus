export default {
    emits:['search'],
    template:`
    <div class="note-filter-con">
        <input class="main-text" type=text @keyup.enter="search"  @input='checkEmpty' v-model='filterByTerm' id='term' placeholder="what to search...">
        <div class="note-filter-middle"></div>
        <select id='type' v-model='filterByType'>
            <option value='all'>all</option>
            <option value='note-txt'>text</option>
            <option value='note-img'>image</option>
            <option value='note-video'>video</option>
            <option value='note-todos'>todos</option>
        </select>
        <span title="Search" class="search-menu-btn" @click='search'><i class="fa-solid fa-magnifying-glass"></i></span>
    </div>
    `,
    data() {
        return {
            filterByTerm:'',
            filterByType:'all',
        }
    },
    methods:{
        checkEmpty() {
            if (this.filterByTerm === '') {
                this.search();
            }
        },
        search() {
            this.$emit('search',this.filterByTerm,this.filterByType)
        },
    },
}