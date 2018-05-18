import React from 'react'
import { List } from 'antd-mobile'
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
        });
        console.log('messageGroup', messageGroup)
        const chatList = Object.values(messageGroup)
        console.log('chatList', chatList)

        return (
            <div>
                <List>
                    {
                        chatList.map(i => {
                            const chat = getLastChat(i)
                            return (
                                <List.Item key={i}>
                                    用户名
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
}