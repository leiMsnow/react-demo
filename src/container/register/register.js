import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Register extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            type:'genuis'
        }
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                <Logo/>
                <h2>Register</h2>
                <WingBlank>
                    <List>
                        <InputItem>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                        <RadioItem checked={this.state.type === 'genuis'}>
                            天才
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}>
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register