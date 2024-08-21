const apiUrl = 'http://localhost:3000/api/todos';

async function loadTodos() {
    const response = await fetch(apiUrl);
    const todos = await response.json();
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

async function addTodo() {
    const todoInput = document.querySelector('#todo-input');
    const newTodo = {
        title: todoInput.value,
        description: ''
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });

    if (response.ok) {
        todoInput.value = '';
        loadTodos();
    }
}

async function deleteTodo(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    loadTodos();
}

document.getElementById('add-todo').onclick = addTodo;

loadTodos();