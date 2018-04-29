import axios from 'axios'
import { Toast } from 'antd-mobile'

axios.interceptors.request.use((config) => {
    Toast.loading('loading...', 0)
    return config
})

axios.interceptors.response.use((config) => {
    console.log('config', config)
    Toast.hide()
    return config
})