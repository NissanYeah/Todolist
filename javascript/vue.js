// 連接資料庫

var config = {
    apiKey: "AIzaSyCYwii4dJlgVvehy3wQpS1Aw8iaXZmNrO8",
    authDomain: "todo-project-e731b.firebaseapp.com",
    databaseURL: "https://todo-project-e731b.firebaseio.com",
    projectId: "todo-project-e731b",
    storageBucket: "todo-project-e731b.appspot.com",
    messagingSenderId: "803994604460"
};
firebase.initializeApp(config);

// 清除資料庫
// var refName = firebase.database().ref().set({})

//資料結構
// var todos = [{
//     id: 12312389,
//     title: "買菜",
//     catagory: "secondary",
//     completed: false
// }];


var app = new Vue({
    el: "#app",
    data: {
        newTodo: "",
        todos: {
            done: 0,
            todolist: []
        },
        visibilty: "all",
        catagory_selected: ''
    },
    methods: {
        addTodo: function () {
            var value = this.newTodo.trim();
            var value_catagory = this.catagory_selected;
            var timestamp = Math.floor(Date.now());
            if (!value) {
                return;
            }
            this.todos.todolist.push({
                id: timestamp,
                title: value,
                catagory: value_catagory,
                completed: false
            });
            firebase.database().ref().set(this.todos);
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            var inindex = '';
            var vm = this;
            var count = 0;
            // 刪除
            this.todos.todolist.forEach(function (item, key) {
                if (item.id === todo.id)
                    inindex = key;
            });
            this.todos.todolist.splice(inindex, 1);

            // 重新計算完成的筆數
            this.todos.todolist.forEach(function (item) {
                if (item.completed) {
                    count++;
                }
            });
            this.todos.done = count;


            firebase.database().ref().set(this.todos);
        },
        removealltodo: function () {
            // 重置資料
            this.todos = {
                done: 0,
                todolist: []
            };
            firebase.database().ref().set(this.todos);
        },
        finish: function (item) {
            item.completed = !item.completed;
            var count = 0;
            this.todos.todolist.forEach(function (item) {
                if (item.completed) {
                    count++;
                }
            });
            this.todos.done = count;
            firebase.database().ref().set(this.todos);



        }


    },
    created: function () {

        var vm = this;
        var getlist = firebase.database().ref();
        getlist.once("value", function (snapshot) {
            vm.todos = snapshot.val();
            if (vm.todos.todolist == undefined) {
                vm.todos.todolist = [];
                // firebase無法儲存空陣列，因此如果todolist未定義，就定義成空陣列
            }
        });





    },
    computed: {
        filteredTodo: function () {
            if (this.visibilty == 'all') {

                return this.todos.todolist;
            } else if (this.visibilty == 'priority') {
                var newTodos = [];
                this.todos.todolist.forEach(function (item) {
                    if (item.catagory == 'priority' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;

            } else if (this.visibilty == 'secondary') {

                var newTodos = [];
                this.todos.todolist.forEach(function (item) {
                    if (item.catagory == 'secondary' && !item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;

            } else if (this.visibilty == 'done') {
                var newTodos = [];
                this.todos.todolist.forEach(function (item) {
                    if (item.completed) {
                        newTodos.push(item);
                    }
                });
                return newTodos;
            }
        }
    }


});