import React from 'react'
import { List, InputItem, NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMessage, getMessageList, receiveMessage } from '../../redux/chat.redux'

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
        this.props.getMessageList()
        this.props.receiveMessage()
    }

    render() {
        const user = this.props.match.params.user
        return (
            <div id='chat-page'>
                <NavBar>{user}</NavBar>
                <div className='stick-footer'>
                    {
                        this.props.chat.chatMessage.map(message => {
                            return message.from === user ? (
                                <List key={message._id}>
                                    <List.Item>
                                        {message.content}
                                    </List.Item>
                                </List>
                            ) : (
                                    <List key={message._id} className='chat-me'>
                                        <List.Item >
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
            </div>
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