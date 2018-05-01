import React from 'react'
import { List, Result, WhiteSpace, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import cookies from 'browser-cookies'
import {Redirect} from 'react-router-dom'

@connect(
    state => state
)
class UserCenter extends React.Component{

    render(){
        const { user } = this.props
        return user.avatar? (
                <div>
                    <Result
                        img={<img alt='' src={require(`../../../component/avatar-selector/images/${user.avatar}.png`)} style={{width:50}}/>}
                        title={user.user}
                        message={user.company}
                    />

                    <List renderHeader={user.type==='boss'?'招聘信息':'简介'}>
                        <List.Item>
                            {user.title}
                            {
                                user.desc.split('\n').map(value=>(
                                    <List.Item.Brief key={value}>
                                        {value}
                                    </List.Item.Brief>
                                ))
                            }
                            {
                            user.type==='boss'?
                                <List.Item.Brief>
                                    薪资待遇: {user.money}
                                </List.Item.Brief>:null
                            }
                        </List.Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <List.Item 
                            onClick={this.logout}
                            arrow="horizontal"
                        >
                            {'退出登录'}
                        </List.Item>
                    </List>
                    </div>
                   ):null
    }
    
    logout=()=>{
        console.log('logout')
        Modal.alert('退出', '是否退出登录?',[
            {text: '取消', onPress:()=>{ console.log('cancel') }},
            {text: '确定', onPress:()=>{ 
                cookies.erase('userId')
             }}
        ])
    }
}

export default UserCenter