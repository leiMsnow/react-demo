import React from 'react'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

import { WarpperState, Logo } from '../../component'
import { constant } from '../../utils'
@connect(
    state => state.user,
    {
        register
    }
)
@WarpperState
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.props.handleState('type', constant.userType.boss)
    }

    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={(v) => this.props.handleState('user', v)}>帐号</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={(v) => this.props.handleState('pwd', v)}>密码</InputItem>
                        <RadioItem checked={this.props.state.type === constant.userType.genius}
                            onChange={() => this.props.handleState('type', constant.userType.genius)}
                        >
                            天才
                        </RadioItem>
                        <RadioItem checked={this.props.state.type === constant.userType.boss}
                            onChange={() => this.props.handleState('type', constant.userType.boss)}
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

    register = () => {
        this.props.register(this.props.state)
    }
}

export default Register