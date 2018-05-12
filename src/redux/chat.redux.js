import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://172.10.4.248:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECEIVE = 'MSG_RECEIVE'
const MSG_READ = 'MSG_READ'

const initState = {
    chatMessage: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatMessage: action.payload,
                unread: action.payload.filter(v => !v.read).length
            }
        case MSG_RECEIVE:
            return {
                ...state,
                chatMessage: [...state.chatMessage, action.payload],
                unread: state.unread + 1
            }
        case MSG_READ:
        default:
            return state
    }
}

export function getMessageList() {
    return dispatch => {
        axios.get('/user/getMessageList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch({
                    type: MSG_LIST,
                    payload: res.data.msg
                })
            }
        })
    }
}

export function sendMessage(data) {
    return dispatch => {
        socket.emit('sendMessage', data)
    }
}

export function receiveMessage() {
    return dispatch => {
        socket.on('receiveMessage', (data) => {
            console.log('receiveMessage', data)
            dispatch({
                type: MSG_RECEIVE,
                payload: data
            })
        })
    }
}