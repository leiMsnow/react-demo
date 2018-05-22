import React from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'
import { getLastChat } from '../../../utils'
@connect(
    state => state,
)
export default class Message extends React.Component {

    render() {
        const messageGroup = {}
        this.props.chat.chatMessage.forEach(m => {
            messageGroup[m.chat_id] = messageGroup[m.chat_id] || []
            messageGroup[m.chat_id].push(m)
        })
        const chatList = Object.values(messageGroup).sort((a, b) => {
            const aTime = getLastChat(a).create_time
            const bTime = getLastChat(b).create_time
            return bTime - aTime
        })

        const { _id: userId } = this.props.user
        const { users } = this.props.chat
        return (
            <div>
                <List>
                    {
                        chatList.map(i => {
                            const chat = getLastChat(i)
                            const targetId = chat.from === userId ? chat.to : chat.from
                            const { name, avatar } = users[targetId] ? users[targetId] : ''
                            const unread = i.filter(j => !j.read && j.to === userId).length
                            return (
                                <List.Item key={i}
                                    extra={<Badge text={unread} />}
                                    thumb={require(`../../../images/avatars/${avatar}.png`)}
                                    arrow='horizontal'
                                    onClick={() => this.chat(targetId)}
                                >
                                    {name}
                                    <List.Item.Brief>
                                        {chat.content}
                                    </List.Item.Brief>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    chat = (v) => {
        this.props.history.push(`/chat/${v}`)
    }
}