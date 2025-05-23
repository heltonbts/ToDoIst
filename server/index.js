const restify = require('restify');
const mongoose = require('mongoose')
require('./database')
const todos = require('./module/todos/controller')
const corsMiddleware = require('restify-cors-middleware2')

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: []
});

const server = restify.createServer()

server.pre(restify.pre.sanitizePath())
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
server.use(restify.plugins.bodyParser({ mapParams: false, allowDots: true }))



server.get('/', async (req, res) => {
    res.send('Hello World')
})

server.get('/todos', todos.list)

server.post('/todos', todos.save)

server.put('/todos/:id', todos.update)

server.del('/todos/:id', todos.remove)


server.listen(2000, () => {
    console.log('Server is listening on port 2000')
})