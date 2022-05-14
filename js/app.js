function todoListComponent({ parent, data, index }) {
    if (data.success) return
    const e = document.createElement('div')
    const title = document.createElement('h4')
    const check = document.createElement('input')
    e.setAttribute('aria-label', `task ${index + 1}: ${data.title}`)
    e.classList.add('task')
    
    title.innerText = data.title
    check.setAttribute('type', 'checkbox')

    check.addEventListener('click', () => {
        let tasks = getTodoList()
        let task = tasks.find(x => x.id == data.id)
        let taskIndex = tasks.findIndex(x => x.id == data.id)
        task.success = true
        task.update = new Date().toISOString()
        tasks[taskIndex] = task
        localStorage.setItem('task', JSON.stringify(tasks))
        loadList()
    })
    
    e.append(check)
    e.append(title)
    parent.append(e)
}

function loadList() {
    const task = getTodoList()
    const div = document.getElementById('todo')
    div.innerHTML = ''
    task.forEach((x, i) => todoListComponent({parent: div, data: x, index: i}))
}


window.addEventListener('load', () => {
    loadList()

    const formAdd = document.querySelector('.form-add')

    formAdd.addEventListener('submit', (e) => {
        e.preventDefault()
        const input = document.getElementById('form-add-title')
        const val = input.value

        if (typeof val !== 'string' || val.length === 0) {
            alert('the task is empty')
        }

        const tasks = getTodoList() || []
        tasks.unshift(createTask(val))
        localStorage.setItem('task', JSON.stringify(tasks))
        input.value = ''
        loadList()
    })
})

