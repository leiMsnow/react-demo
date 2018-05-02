import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { update } from '../../redux/user.redux'
import { AvatarSelector } from '../../component'

@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            company: '',
            title: '',
            money: '',
            desc: '',
            avatar: ''
        }
    }

    render() {
        const { pathname } = this.props.location
        const { redirectTo } = this.props
        return (
            <div>
                {redirectTo && redirectTo !== pathname ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode="dark"
                    rightContent={
                        [
                            <Button key='submit' type='primary' onClick={() => this.updateInfo()}>提交</Button>
                        ]
                    }
                >BossInfo</NavBar>
                <AvatarSelector selected={(v) => this.handleState('avatar', v)} />
                <InputItem onChange={(v) => { this.handleState('company', v) }}>公司名称 </InputItem>
                <InputItem onChange={(v) => { this.handleState('title', v) }}>招聘岗位 </InputItem>
                <InputItem onChange={(v) => { this.handleState('money', v) }}>薪资待遇 </InputItem>
                <TextareaItem
                    title='职位描述'
                    rows={3}
                    autoHeight
                    onChange={(v) => { this.handleState('desc', v) }} />
            </div>
        )
    }

    handleState = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    updateInfo = () => {
        this.props.update(this.state)
    }
}

export default BossInfo