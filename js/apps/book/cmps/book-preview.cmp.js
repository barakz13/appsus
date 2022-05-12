export default {
    props:['book'],
    template:`
        <section class="book-preview">
            <p>{{book.title}}</p>
            <p>{{book.listPrice.amount}} {{presentedCoin}}</p>
            <p><img class='book-pic' :src='book.thumbnail'> </p>
        </section>
    `,
    data(){
        return{}
    },
    created(){
    },
    methods:{},
    computed:{
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
        
    }
}