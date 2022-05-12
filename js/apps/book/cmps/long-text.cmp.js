export default {
    props:['desc'],
    template:`
    
        <p v-if="!isFullText">
           {{show100Chars}}
           <button @click="this.isFullText = true">Read More</button>
        </p>
        <p v-else>
            {{desc}}
            <button @click="this.isFullText = false">Read Less</button>
        </p>
                
            `,
    data() {
        return {
            isFullText:false,
        }
    },
    methods:{


    },
    computed: {
        show100Chars() {
          return this.desc.substr(0, 100);
        },
    },

}