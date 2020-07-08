//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

//Event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deletecheck);
filteroption.addEventListener('click', filtertodo)

//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    savelocaltodos(todoInput.value);
    //checkmark button
    const completed = document.createElement('button');
    completed.innerHTML = "<i class='fas fa-check'></i>";
    completed.classList.add('complete-btn');
    todoDiv.appendChild(completed)
    //check trash button
    const trash = document.createElement('button');
    trash.innerHTML = "<i class='fas fa-trash'></i>";
    trash.classList.add('trash-btn');
    todoDiv.appendChild(trash)
    //append to list
    todoList.appendChild(todoDiv);
    //clear input field
    todoInput.value = '';
}

function deletecheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove()
        });
    }

    //checkmark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filtertodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function savelocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}