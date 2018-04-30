import React from 'react'
import { connect } from 'react-redux'

import { getList } from '../../../redux/user.redux'
import UserList from '../../../component/userlist'

@connect(
    state => state.user,
    { getList }
)
export default class Boss extends React.Component{

    componentDidMount(){
        this.props.getList('boss')
    }

    render(){
        const { userList } = this.props
        return(
            <UserList data={userList} />
        )
    }
}