import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { connect } from 'react-redux'
import { getList } from '../../../redux/user.redux'

@connect(
    state => state.user,
    { getList }
)
export default class Boss extends React.Component{

    componentDidMount(){
        const {type} = this.props
        this.props.getList(type)
    }

    render(){
        const { userList } = this.props
        return(
            <WingBlank>
                {
                    userList.map((v)=>(
                        <div>
                            <WhiteSpace />
                            <Card key={v._id}>
                                <Card.Header
                                    title={v.user}
                                    extra={v.title}
                                    thumb={require(`../../../component/avatar-selector/images/${v.avatar}.png`)}
                                >
                                </Card.Header>
                                <Card.Body>
                                    {v.desc.split('\n').map(sv=>(
                                        <div key={sv}>{sv}</div>
                                    ))}
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}