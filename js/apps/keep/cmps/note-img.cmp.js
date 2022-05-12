export default {
  inheritAttrs: false,
  props: ['data'],
  template: `
        <div class='note-text-con'><span>{{data.info.txt}}</span></div>
        <div class='note-img-con'>
            <img class='note-img' :src='data.info.url'>
        </div>
        
    `,
};
