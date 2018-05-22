import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://172.10.4.248:9093')

const MSG_LIST = 'MSG_LIST'
const MSG_RECEIVE = 'MSG_RECEIVE'
const MSG_READ = 'MSG_READ'

const initState = {
    chatMessage: [],
    users: {},
    unread: 0,
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatMessage: action.payload.msg,
                users: action.payload.users,
                unread: action.payload.msg.filter(v => !v.read && v.to === action.payload.userId).length
            }
        case MSG_RECEIVE:
            return {
                ...state,
                chatMessage: [...state.chatMessage, action.payload.data],
                unread: state.unread + (action.payload.data.to === action.payload.userId ? 1 : 0)
            }
        case MSG_READ:
            const { chatUserId, num } = action.payload
            return {
                ...state,
                chatMessage: state.chatMessage.map(m => ({
                    ...m, read: chatUserId === m.from
                })),
                unread: state.unread - num
            }
        default:
            return state
    }
}

export function getMessageList() {
    return (dispatch, getState) => {
        axios.get('/user/getMessageList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userId = getState().user._id
                dispatch({
                    type: MSG_LIST,
                    payload: {
                        ...res.data,
                        userId
                    }
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
    return (dispatch, getState) => {
        socket.on('receiveMessage', (data) => {
            const userId = getState().user._id
            dispatch({
                type: MSG_RECEIVE,
                payload: {
                    data,
                    userId
                }
            })
        })
    }
}

export function readMessage(chatUserId) {
    return (dispatch, getState) => {
        axios.post('/user/readMessage', { chatUserId })
            .then(res => {
                const myUserId = getState().user._id
                console.log('myUserId', myUserId)
                console.log('chatUserId', chatUserId)
                if (res.status === 200 && res.data.code === 0) {
                    dispatch({
                        type: MSG_READ,
                        payload: {
                            chatUserId,
                            myUserId,
                            num: res.data.num
                        }
                    })
                }

            })
    }
}