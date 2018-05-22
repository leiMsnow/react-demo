import React from 'react'
import { List, InputItem, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMessage, getMessageList, receiveMessage, readMessage } from '../../redux/chat.redux'

import { Navbar } from '../../component'
import { getChatId } from '../../utils';

@connect(
    state => state,
    { sendMessage, getMessageList, receiveMessage, readMessage }
)
class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            text: '',
            showEmoji: false
        }
    }

    componentDidMount() {
        if (!this.props.chat.chatMessage.length) {
            this.props.getMessageList()
            this.props.receiveMessage()
        }
    }

    componentWillUnmount() {
        const chatUserId = this.props.match.params.user
        this.props.readMessage(chatUserId)
    }

    fixCarousel = () => {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }

    render() {

        const emoji = '😛 😁 😂 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 ☺️ 🙂 🤗 🤩 🤔 🤨'
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

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
                            extra={
                                <div>
                                    <span
                                        style={{ marginRight: 10 }}
                                        role='img'
                                        aria-label='emoji'
                                        onClick={() => {
                                            this.setState({
                                                showEmoji: !this.state.showEmoji
                                            })
                                            this.fixCarousel()
                                        }
                                        }
                                    >😁</span>
                                    <span onClick={() => this.submit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {
                        this.state.showEmoji ?
                            (<Grid
                                data={emoji}
                                columnNum={9}
                                carouselMaxRow={2}
                                isCarousel={true}
                                onClick={el => {
                                    this.setState({ text: this.state.text + el.text })
                                }}
                            />) : null
                    }

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