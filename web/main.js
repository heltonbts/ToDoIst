const ulElement = document.querySelector('#tasks ul')
const tasks = []

function onLoad() {
    ulElement.innerHTML = ''

    fetch('http://localhost:2000/todos')
        .then(res => res.json())
        .then((data) => data.forEach((item) => addInDom(item)))
}

function addInDom(task) {
    const taskElement = document.createElement('li')
    const textElement = document.createElement('span')
    const btnElement = document.createElement('button')

    taskElement.setAttribute('id', `item-${task._id}`)

    btnElement.onclick = function () {
        removeTask(task._id)
    }

    taskElement.appendChild(textElement)
    taskElement.appendChild(btnElement)


    textElement.innerHTML = task.text
    btnElement.innerHTML = "remover"

    ulElement.appendChild(taskElement)

}

function addTask(text) {
    fetch('http://localhost:2000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log('Tarefa salva no banco:', data)
            addInDom(data)
        })
        .catch(error => {
            console.error('Erro ao salvar:', error)
        })
}

function removeTask(taskId) {
    // 1. Fazer DELETE na API
    fetch(`http://localhost:2000/todos/${taskId}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log('Tarefa removida do banco:', data)

            // 2. Remover do DOM
            const taskElement = document.getElementById(`item-${taskId}`)
            if (taskElement) {
                taskElement.remove()
            }
        })
        .catch(error => {
            console.error('Erro ao remover:', error)
        })
}


const btnAdcionar = document.querySelector('#form button')
const imputElement = document.querySelector('#form input')

btnAdcionar.onclick = function () {
    if (imputElement.value) {
        addTask(imputElement.value)
        imputElement.value = ''
    }
}

window.onload = onLoad
