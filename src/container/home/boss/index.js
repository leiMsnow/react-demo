import React from 'react'
import { connect } from 'react-redux'

import { getList } from '../../../redux/user.redux'
import { UserList } from '../../../component'
import { constant } from '../../../utils'
@connect(
    state => state.user,
    { getList }
)
export default class Boss extends React.Component {

    componentDidMount() {
        this.props.getList(constant.userType.genius)
    }

    render() {
        const { userList } = this.props
        return (
            <UserList data={userList} />
        )
    }
}