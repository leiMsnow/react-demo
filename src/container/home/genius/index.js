import React from 'react'
import { connect } from 'react-redux'

import { getList } from '../../../redux/user.redux'
import UserList from '../../../component/userlist'
import { constant } from '../../../utils'
@connect(
    state => state.user,
    { getList }
)
export default class Genius extends React.Component {

    componentDidMount() {
        this.props.getList(constant.userType.boss)
    }

    render() {
        const { userList } = this.props
        return (
            <UserList data={userList} />
        )
    }
}