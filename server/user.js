const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', (req, res)=>{
    User.find({},(err,data)=>{
        return res.json(data)
    })
})

Router.post('/register',(req, res)=>{
    const { user, pwd, type } = req.body
    User.findOne({ user:user }, (err, data)=>{
        if(data){
            return res.json({
                code:1, msg:'用户名已经存在'
            })
        }
        User.create({user, pwd, type }, (err, data)=>{
            if(e){
                return res.json({
                    code:1, msg:'服务端异常'
                })
            }
            return res.json({code:0, msg:'注册成功'})
        })
    })
})

Router.get('/info', (req, res)=>{
    return res.json({ code:1})
})

module.exports = Router