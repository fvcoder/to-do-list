function generateId() {
    return 'xxx-xxx-xxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    })
}

function getTodoList() {
    if (!localStorage.getItem('task')) localStorage.setItem('task', JSON.stringify([]))

    const tasks = JSON.parse(localStorage.getItem('task'))

    if (typeof tasks !== 'object' || !Array.isArray(tasks))  localStorage.setItem('task', JSON.stringify([]))

    return JSON.parse(localStorage.getItem('task'))
}

function createTask(title = '') {
    const id = generateId()
    const create = new Date().toISOString()
    return {
        id,
        title,
        create,
        success: false
    }
}