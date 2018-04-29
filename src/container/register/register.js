import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'

@connect(
    state=> state.user,
    {
        register
    }
)
class Register extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            user:'',
            pwd:'',
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
                        <InputItem onChange={(v)=>this.handleChange('user', v)}>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={(v)=>this.handleChange('pwd', v)}>密码</InputItem>
                        <RadioItem checked={this.state.type === 'genuis'}
                            onChange={()=>this.handleChange('type','genuis')}
                        >
                            天才
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}
                            onChange={()=>this.handleChange('type','boss')}
                        >
                            Boss
                        </RadioItem>
                    </List>
                    <WhiteSpace />
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }

    handleChange=(key, val)=>{
        this.setState({
            [key]:val
        })
    }

    register=()=>{
        console.log(this.state)
        this.props.register(this.state)
    }
}

export default Register