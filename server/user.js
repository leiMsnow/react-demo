const express = require('express')
const utils = require('utility')

const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = { pwd: 0, __v: 0 }

Router.get('/list', (req, res) => {
    // User.remove({},(err,data)=>{ console.log('remvoe all user success')})
    const { type } = req.query

    User.find({ type }, _filter, (err, data) => {
        return res.json({
            code: 0,
            userList: data.filter((v) => v.avatar)
        })
    })
})

Router.post('/register', (req, res) => {
    const { user, pwd, type } = req.body
    User.findOne({ user }, (err, data) => {
        if (data) {
            return res.json({
                code: 1, msg: '用户名已经存在'
            })
        }
        User.create({ user, pwd: md5Pwd(pwd), type }, (err, data) => {
            if (err) {
                return res.json({
                    code: 1, msg: '服务端异常'
                })
            }
            res.cookie('userId', data._id)
            return res.json({
                code: 0,
                userInfo: {
                    user: data.user,
                    type: data.type,
                    _id: data._id,
                }
            })
        })
    })
})

Router.post('/login', (req, res) => {
    const { user, pwd } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, data) => {
        if (data) {
            res.cookie('userId', data._id)
            return res.json({
                code: 0,
                userInfo: data
            })
        }
        return res.json({
            code: 1,
            msg: '账号不存在或者密码错误'
        })
    })
})

Router.get('/info', (req, res) => {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({ code: 1 })
    }
    User.findById({ _id: userId }, _filter, (err, data) => {
        if (data) {
            return res.json({
                code: 0,
                userInfo: data
            })
        }
        return res.json({ code: 1 })
    })
})

Router.post('/update', (req, res) => {
    const { userId } = req.cookies
    if (!userId) {
        return res.json({
            code: 1
        })
    }
    const body = req.body
    User.findByIdAndUpdate({ _id: userId }, body, (err, data) => {
        if (data) {
            const userInfo = Object.assign({}, {
                user: data.user,
                type: data.type
            }, body)
            return res.json({
                code: 0,
                userInfo
            })
        }
        return res.json({
            code: 1,
            msg: '更新失败',
        })
    })
})

Router.get('/getMessageList', (req, res) => {
    // Chat.remove({}, (err, data) => { console.log('remvoe all chat message success') })
    let users = {}
    User.find({}, (err, data) => {
        data.filter(f => f.avatar).forEach(user => {
            users[user._id] = {
                name: user.user,
                avatar: user.avatar
            }
        })
    })
    const { userId } = req.cookies
    const where = { '$or': [{ from: userId }, { to: userId }] }
    Chat.find(where, _filter, (err, data) => {
        if (!err) {
            return res.json({
                code: 0,
                msg: data,
                users: users
            })
        }
    })
})

Router.post('/readMessage', (req, res) => {
    const { userId } = req.cookies
    const { chatUserId } = req.body
    console.log('myUserId', userId)
    console.log('chatUserId', chatUserId)
    Chat.update(
        { from: chatUserId, to: userId },
        { '$set': { read: true } },
        { 'multi': true },
        (err, data) => {
            if (err) {
                return res.json({
                    code: 1,
                    msg: '修改失败'
                })
            }
            console.log(data)
            return res.json({
                code: 0,
                num: data.nModified
            })
        })
})

md5Pwd = (pwd) => {
    const salt = 'react-demo-ray-!!&!@@'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router