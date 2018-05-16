import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMessage, getMessageList, receiveMessage } from '../../redux/chat.redux'

import { Navbar } from '../../component'
import { getChatId } from '../../utils';

@connect(
    state => state,
    { sendMessage, getMessageList, receiveMessage }
)
class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatMessage.length) {
            this.props.getMessageList()
            this.props.receiveMessage()
        }
    }

    render() {
        const userId = this.props.match.params.user
        const { users } = this.props.chat
        if (!users[userId]) {
            return null
        }
        const chatId = getChatId(userId, this.props.user._id)
        const chatMessage = this.props.chat.chatMessage.filter(m => m.chat_id === chatId)
        return (
            <div id='chat-page'>
                <Navbar title={users[userId].name} />
                <div className='stick-footer'>
                    {
                        chatMessage.map(message => {
                            return message.from === userId ? (
                                <List key={message._id}>
                                    <List.Item
                                        thumb={require(`../../images/avatars/${users[userId].avatar}.png`)}
                                    >
                                        {message.content}
                                    </List.Item>
                                </List>
                            ) : (
                                    <List key={message._id} className='chat-me'>
                                        <List.Item extra={<img alt='' src={require(`../../images/avatars/${this.props.user.avatar}.png`)} />}>
                                            {message.content}
                                        </List.Item>
                                    </List>
                                )
                        })
                    }
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={text => {
                                this.setState({ text })
                            }}
                            extra={<span onClick={() => this.submit()}>发送</span>}
                        />
                    </List>
                </div>
            </div >
        )
    }

    submit = () => {
        if (this.state.text) {
            this.setState({ text: '' })
            const data = {
                from: this.props.user._id,
                to: this.props.match.params.user,
                content: this.state.text
            }
            this.props.sendMessage(data)
        }
    }
}


export default Chat