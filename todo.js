const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",letTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
clearButton.addEventListener("click",clearTodoUIandStorage);
filter.addEventListener("keyup",findTodo);
}

function deleteTodo(e){
    if(e.target.className==="bi bi-trash"){
        const oldTodo=e.target.parentElement.parentElement;
       oldTodo.remove();

     deleteTodoToStorage(oldTodo.textContent);
    }
}

function letTodosToUI(){
    let todos= getTodosFromStorege();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}
function addTodo(e) {

    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert();
    } else {
        showAlertSuc();
        addTodoToStorage(newTodo);
        addTodoUI(newTodo);

    }


    e.preventDefault();
}

             
function addTodoUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "javascript: return false;";
    link.className = "text-decoration-none";
    link.innerHTML = "<i class='bi bi-trash'></i>";

    listItem.className = "list-group-item d-flex justify-content-between"
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}

function findTodo(){
    let filterTodo=filter.value.toLowerCase();
    clearTodoUI();
    let todos= getTodosFromStorege();
    todos.forEach(function(todo){
        if(todo.toLowerCase().includes(filterTodo))
        addTodoUI(todo);
    })


        
    


}


function clearTodoUI(){
    const listUI=document.querySelector(".list-group");
    listUI.innerHTML="";
    
}
function clearTodoUIandStorage(){
    localStorage.removeItem("todos");
    clearTodoUI();
    
}

function hiddenAlert() {
    const alert = document.querySelector(".alert.alert-danger");
    alert.setAttribute("style", "display:none;")
}


function hiddenAlertSuc() {
    const alert = document.querySelector(".alert.alert-success");
    alert.setAttribute("style", "display:none;")

}


function showAlert() {
    const alert = document.querySelector(".alert.alert-danger");
    alert.setAttribute("style", "display:block;");
    setTimeout(function () {
        hiddenAlert();
    }, 1000);

}
function showAlertSuc() {
    const alert = document.querySelector(".alert.alert-success");
    alert.setAttribute("style", "display:block;");
    setTimeout(function () {
        hiddenAlertSuc();
    }, 1000);

}

function getTodosFromStorege() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorege();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}  
function deleteTodoToStorage(newTodo) {
    let todos = getTodosFromStorege();
    let todosNew=[];
    todos.forEach(function(todo){
        if(todo!=newTodo){
todosNew.push(todo);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todosNew));
}  