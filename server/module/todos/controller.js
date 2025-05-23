const TodoModel = require('./model')

const list = async (req, res) => {
    try {
        const todos = await TodoModel.find({})
        res.send(todos)
    } catch (error) {
        console.log('Erro:', error)
        res.send(500, { error: 'Erro ao buscar tarefas' })
    }
}
const save = async (req, res) => {
    try {
        const todo = new TodoModel({ text: req.body.text })
        await todo.save()
        res.send(201, todo)
    } catch (error) {
        console.log('Erro:', error)
        res.send(500, { error: 'Erro ao salvar tarefa' })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await TodoModel.findByIdAndUpdate(
            id,
            { text: req.body.text },
            { new: true }
        )

        if (!todo) {
            return res.send(404, { error: 'Tarefa não encontrada' })
        }

        res.send(200, todo)
    }
    catch (error) {
        console.log(error)
        res.send(500, { error: 'Erro ao atualizar tarefa' })
    }
}

const remove = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await TodoModel.findByIdAndDelete(id)

        if (!todo) {
            return res.send(404, { error: 'Tarefa não encontrada' })
        }

        res.send(200, { message: 'Tarefa removida com sucesso', todo })
    }
    catch (error) {
        console.log(error)
        res.send(500, { error: 'Erro ao remover tarefa' })
    }
}

module.exports = {
    list,
    save,
    update,
    remove
}