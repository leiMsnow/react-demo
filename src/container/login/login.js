import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

class Login extends React.Component {

    render() {
        return (
            <div>
                <Logo/>
                <h2>Login</h2>
                <WingBlank>
                    <List>
                        <InputItem>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem>密码</InputItem>
                    </List>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }

    register = () =>{
        this.props.history.push('/register')
    }
}

export default Login