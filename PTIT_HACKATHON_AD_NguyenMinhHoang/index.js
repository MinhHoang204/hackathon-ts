"use strict";
class TodoList {
    constructor(todolist) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.todolist = todolist;
    }

    renderJob() {
        const listWork = document.querySelector('.list-work');
        listWork.innerHTML = '';
        this.todolist.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'work-item';
            li.innerHTML = `
                <div class="work-item-left">
                    <input type="checkbox" ${item.completed ? 'checked' : ''} onclick="choose(${item.id})">
                    <p ${item.completed ? 'style="text-decoration: line-through;"' : ''}> ${item.name} </p>
                </div>
                <div class="work-item-right"> 
                    <i class="fa-solid fa-pen-to-square" onclick="edit(${item.id})"></i>
                    <i class="fa-solid fa-trash-can" onclick="remove(${item.id})"></i>
                </div>`;
            listWork.appendChild(li);
        });
    }

    createJob(name) {
        const newItem = {
            id: this.todolist.length + 1,
            name: name,
            completed: false
        };
        this.todolist.push(newItem);
        this.saveData();
    }

    updateJob(id) {
        const index = this.todolist.findIndex(item => item.id === id);
        if (index !== -1) {
            this.todolist[index].completed = !this.todolist[index].completed;
            this.saveData();
        }
    }

    deleteJob(id) {
        this.todolist = this.todolist.filter(item => item.id !== id);
        this.saveData();
    }

    saveData() {
        localStorage.setItem('todolist', JSON.stringify(this.todolist));
        this.renderJob();
    }
}

// Initialize TodoList
let todolist = JSON.parse(localStorage.getItem('todolist')) || [];
let todoListObj = new TodoList(todolist);
todoListObj.renderJob();

// Add job event
const addBtn = document.querySelector('.btn-add');
addBtn.addEventListener('click', () => {
    const input = document.querySelector('.header-input');
    if (input.value.trim() !== '') {
        todoListObj.createJob(input.value.trim());
        input.value = '';
    } else {
        alert('Vui lòng nhập tên công việc');
    }
});

// Checkbox event
function choose(id) {
    todoListObj.updateJob(id);
}

// Delete job event
function remove(id) {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        todoListObj.deleteJob(id);
    }
}

// Edit job event
function edit(id) {
    // Implement edit function here
}