import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    { login }
)
class Login extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user:'',
            pwd:''
        }
    }

    render() {
        return (
            <div>
                { this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo/>
                <h2>Login</h2>
                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>{
                            this.handleState('user',v)
                        }}>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={(v)=>{
                            this.handleState('pwd',v)
                        }}>密码</InputItem>
                    </List>
                    <Button onClick={this.login} type='primary'>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }

    handleState=(key, value)=>{
        this.setState({
            [key]:value
        })
    }

    login=()=>{
        console.log(this.state)
        this.props.login(this.state)
    }

    register = () =>{
        this.props.history.push('/register')
    }
}

export default Login