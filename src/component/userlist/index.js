import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class UserList extends React.Component{

    render(){
        const { data } = this.props
        return(
            <WingBlank>
                {
                    data.map((v)=>(
                        <div>
                            <WhiteSpace />
                            <Card key={v._id}>
                                <Card.Header
                                    title={v.user}
                                    extra={v.title}
                                    thumb={require(`../component/avatar-selector/images/${v.avatar}.png`)}
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

UserList.propTypes = {
    data:PropTypes.array.isRequired
}