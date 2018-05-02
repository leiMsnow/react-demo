import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getRedirectPath } from '../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const USER_LIST_SUCCESS = 'USER_LIST_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState = {
	redirectTo: '',
	msg: '',
	user: '',
	type: '',
	userList: [],
}

export function user(state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
		case LOAD_DATA:
			return { ...state, ...action.payload }
		case USER_LIST_SUCCESS:
			return { ...state, ...action.payload }
		case ERROR_MSG:
			return { ...state, msg: action.msg }
		case LOGOUT:
			return { ...initState, redirectTo: '/login' }
		default:
			return state
	}
}

function authSuccess(data) {
	return { type: AUTH_SUCCESS, payload: data }
}

function userListSuccess(data) {
	return { type: USER_LIST_SUCCESS, payload: data }
}

function errorMsg(msg) {
	Toast.show(msg, 2)
	return { msg, type: ERROR_MSG }
}

export function loadData(userInfo) {
	return { type: LOAD_DATA, payload: userInfo }
}

export function login({ user, pwd }) {
	if (!user || !pwd) {
		return errorMsg('用户密码必须输入')
	}
	return dispatch => {
		axios.post('/user/login', { user, pwd })
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.userInfo))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function register({ user, pwd, type }) {
	if (!user || !pwd || !type) {
		return errorMsg('用户名密码必须输入')
	}
	return dispatch => {
		axios.post('/user/register', { user, pwd, type })
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.userInfo))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function update({ company, title, desc, money, avatar }) {
	// if(!company|| !title|| !desc|| !money|| !avatar){
	// 	return errorMsg('请填写完整信息')
	// }
	return dispatch => {
		axios.post('/user/update', { company, title, desc, money, avatar })
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.userInfo))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function getList(type) {
	return dispatch => {
		axios.get(`/user/list?type=${type}`)
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(userListSuccess(res.data))
				} else {
					dispatch(errorMsg(res.data.msg))
				}
			})
	}
}

export function logout() {
	return dispatch => {
		dispatch({
			type: LOGOUT
		})
	}
}


