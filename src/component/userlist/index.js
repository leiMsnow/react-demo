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
                        <div key={v._id}>
                            <WhiteSpace />
                            <Card >
                                <Card.Header
                                    title={v.user}
                                    extra={ (v.type === 'boss'?'招聘: ':'')+ v.title}
                                    thumb={require(`../avatar-selector/images/${v.avatar}.png`)}
                                />
                                <Card.Body>
                                    {v.desc.split('\n').map(sv=>(
                                        <div key={sv}>{sv}</div>
                                    ))}
                                </Card.Body>
                                {
                                    v.type === 'boss'?
                                    <Card.Footer
                                        content={`公司: ${v.company}`}
                                        extra={`薪资: ${v.money}`}
                                    />:null
                                }
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