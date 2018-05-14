import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { constant } from '../../utils'

@withRouter
export default class UserList extends React.Component {

    render() {
        const { data } = this.props
        return (
            <WingBlank>
                {
                    data.map((v) => (
                        <div key={v._id} onClick={() => this.chat(v)}>
                            <WhiteSpace />
                            <Card >
                                <Card.Header
                                    title={v.user}
                                    extra={(v.type === constant.userType.boss ? '招聘: ' : '') + v.title}
                                    thumb={require(`../../images/avatars/${v.avatar}.png`)}
                                />
                                <Card.Body>
                                    {v.desc.split('\n').map(sv => (
                                        <div key={sv}>{sv}</div>
                                    ))}
                                </Card.Body>
                                {
                                    v.type === constant.userType.boss ?
                                        <Card.Footer
                                            content={`公司: ${v.company}`}
                                            extra={`薪资: ${v.money}`}
                                        /> : null
                                }
                            </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }

    chat = (v) => {
        this.props.history.push(`/chat/${v._id}`)
    }
}

UserList.propTypes = {
    data: PropTypes.array.isRequired
}