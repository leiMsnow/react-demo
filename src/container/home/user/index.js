import React from 'react'
import { List, Result, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
    state => state,
)
export default class UserCenter extends React.Component{

    render(){
        const { user } = this.props
        return user.avatar?(
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
                    <List.Item>
                        退出登录
                    </List.Item>
                </List>
            </div>
        ):null
    }
}