export default {
    props:['data'],
    template:`
        <div class='note-text-con'>{{shortTxt}}</div>
    `,
    computed:{
        shortTxt() {
            var txt = this.data.info.txt
            if (txt.length < 200) return txt
            else return txt.substr(0,150);
        }
    },
}