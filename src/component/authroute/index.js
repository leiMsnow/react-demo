import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
    state => state.user,
    { loadData }
)
class AuthRoute extends React.Component {

    componentDidMount() {
        axios.get('/user/info').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                this.props.loadData(res.data.userInfo)
                this.needLogin()
            } else {
                this.needLogin()
            }
        })
    }

    render() {
        return null
    }

    needLogin = () => {
        const publicList = ['/login', '/register']
        const { pathname } = this.props.location
        if (publicList.indexOf(pathname) > -1) {
            if (this.props._id) {
                this.props.history.push('/home')
            }
        } else if (!this.props._id) {
            this.props.history.push('/login')
        }
    }
}

export default AuthRoute