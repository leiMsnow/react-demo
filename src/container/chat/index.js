import React from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMessageList, sendMessage, receiveMessage } from '../../redux/chat.redux'

@connect(
    state => state,
    { getMessageList, sendMessage, receiveMessage }
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
        return (
            <div className='stick-footer'>
                {
                    this.props.chat.chatMessage.map(message => {
                        return (
                            <p key={message.chat_id}>
                                {message.content}
                            </p>
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