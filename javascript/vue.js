var config = {
    apiKey: "AIzaSyCYwii4dJlgVvehy3wQpS1Aw8iaXZmNrO8",
    authDomain: "todo-project-e731b.firebaseapp.com",
    databaseURL: "https://todo-project-e731b.firebaseio.com",
    projectId: "todo-project-e731b",
    storageBucket: "todo-project-e731b.appspot.com",
    messagingSenderId: "803994604460"
};
firebase.initializeApp(config);

// var refName = firebase.database().ref().set({})
// 清除資料庫

var todos = [];


var app = new Vue({
    el: "#app",
    data: {
        newTodo: "",
        catagory_selected: "",
        todos: todos,
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
            firebase.database().ref().set(this.todos);
            this.newTodo = '';
        },
        removeTodo: function (key) {
            this.todos.splice(key, 1);
            firebase.database().ref().set(this.todos);
        },

    },
    created: function () {
        // firebase.database().ref();
        // firebase.database().ref().set(todos);
        // 把資料推入資料庫
        var vm = this;
        var refname = firebase.database().ref()
        refname.once("value", function (snapshot) {
            vm.todos = snapshot.val()

        })

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