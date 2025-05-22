const restify = require('restify');

const server = restify.createServer()

server.pre(restify.pre.sanitizePath())
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: false, allowDots: true }))
server.use(restify.plugins.bodyParser({ mapParams: false, allowDots: true }))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next('')
})

server.get('/', async (req, res) => {
    await res.send('Hello World')
})

server.listen(2000, () => {
    console.log('Server is listening on port 2000')
})