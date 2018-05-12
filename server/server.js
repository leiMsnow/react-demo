const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('client connection')
    socket.on('sendMessage', (data) => {
        console.log('receive message:', data)
        const { from, to, content } = data
        const chat_id = [from, to].sort().join('_')
        Chat.create({
            chat_id,
            from,
            to,
            content,
        }, (err, data) => {
            io.emit('receiveMessage', Object.assign({}, data._doc))
        })
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, () => {
    console.log('server start at prot 9093')
})