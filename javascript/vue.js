var app = new Vue({
    el: "#app",
    data: {
        newTodo: "",
        catagory_selected: "",
        todos: [{
            id: '123',
            title: '任務',
            catagory: '',
            completed: false
        }],
        visibilty: "all"
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo.trim();
            var value_catagory = this.catagory_selected;
            if (!value) {
                return;
            }
            if (value && !value_catagory) {
                alert("請選擇任務類型")
                return;
            }
            var timestamp = Math.floor(Date.now());
            this.todos.push({
                id: timestamp,
                title: value,
                catagory: value_catagory,
                completed: false
            });
            this.newTodo = '';
        },
        removeTodo: function (key) {
            this.todos.splice(key, 1);
        },

    },
    computed: {
        filteredTodo: function () {


            if (this.visibilty == 'all') {
                return this.todos;
            } else if (this.visibilty == 'life-main-line') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.catagory == '人生主線' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            } else if (this.visibilty == 'life-vice-line') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.catagory == '人生雜事' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;

            } else if (this.visibilty == 'work-main-line') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.catagory == '工作主線' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            } else if (this.visibilty == 'work-vice-line') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.catagory == '工作雜事' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            } else if (this.visibilty == 'done') {
                var newTodos = [];
                this.todos.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            }
        }
    }

});