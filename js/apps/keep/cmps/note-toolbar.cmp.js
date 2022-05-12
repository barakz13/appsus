export default {
    emits:['changeColor','pin','unpin','remove','duplicate','email','edit'],
    props:['data'],
    template:`
    <!-- {{data}} -->

    `,
    data() {
        return {
            noteColor:this.data.style.backgroundColor,
        };
    },
    methods:{
        edit() {
            this.$emit('edit',this.data)
        },
        showColorPick() {

            this.$refs.colorChoose.click();
        },
        changeColor() {
            this.$emit('changeColor',this.data,this.noteColor)
        },
        pin() {
            this.$emit('pin',this.data)
        },
        unpin() {
            this.$emit('unpin',this.data)
        },
        remove() {
            this.$emit('remove',this.data)
        },
        duplicate() {
            this.$emit('duplicate',this.data)
        },
        email() {
            this.$emit('email',this.data)
        },
        
    },
    created() {
    },
    mounted() {
    }
}