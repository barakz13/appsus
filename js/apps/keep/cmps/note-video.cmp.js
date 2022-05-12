export default {
  inheritAttrs: false,
  props: ['data'],
  template: `
        <div class='note-text-con'>{{data.info.txt}}</div>
        <div class='video-con'>
            <iframe width="100%" height="100%" :src="data.info.url">
            </iframe>
        </div>
    `,
};
