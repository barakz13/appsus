export default {
  emits: ['invertTodo'],
  props: ['data'],
  template: `
        <div class="note-text-con"><strong>{{data.info.txt}}</strong></div>
        <ul class="ul-style">
            <li v-for='todo in data.info.todos' :key='todo.id'>
                <div class="note-text-con" :style="todoStyle(todo)"  @click="$emit('invertTodo',data,todo)">
                    {{todo.txt}}
                </div>
            </li>
        </ul>
    `,
  data() {
    return {
      todos: this.data.info.todos,
    };
  },
  created() {},
  methods: {
    inverttodo(todo) {
      if (todo.doneAt) {
        todo.done = null;
      } else {
        todo.done = Date.now();
      }
    },
    todoStyle(todo) {
      if (todo.doneAt) {
        return 'text-decoration: line-through;';
      } else {
        return 'text-decoration: none;';
      }
    },
  },
  computed: {},
};
