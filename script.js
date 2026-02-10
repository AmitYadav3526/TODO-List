 document.addEventListener('DOMContentLoaded', ()=> {
 let todoInput = document.getElementById('todo-input');
let addTaskBtn = document.getElementById('add-task-btn');
let todoList = document.getElementById('todo-list');

let tasks=JSON.parse(localStorage.getItem('tasks')  ) || [];

tasks.forEach(task => renderTasks(task));

addTaskBtn.addEventListener('click', ()=> {
  const taskText = todoInput.value.trim();
  if (taskText === '')  return;


    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value = '';// Clear input field
    console.log(tasks); 
  });

  function renderTasks(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    if(task.completed){
      li.classList.add('completed');
    }
    li.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;

    li.addEventListener('click', (e)=> {
      if(e.target,tagName==='BUTTON')return;
      task.completed = !task.completed;
      li.classList.toggle('completed');
      saveTasks();
    });

    li.querySelector('button').addEventListener('click', (e)=> {
      e.stopPropagation();// Prevent li click event
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
    });


    todoList.appendChild(li);
  } 


  function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

 });