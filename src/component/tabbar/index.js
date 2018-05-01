import React from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

@withRouter
class Tabbar extends React.Component{

    render(){
        const {pathname} = this.props.location
        const navList = this.props.data.filter((v)=>!v.hide)
        return(
            <TabBar>
                {
                    navList.map(v=>(
                        <TabBar.Item
                            key={v.path}
                            title={v.text}
                            icon={{uri:require(`./images/${v.icon}.png`)}}
                            selectedIcon={{uri:require(`./images/${v.icon}-active.png`)}}
                            selected={v.path===pathname}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
Tabbar.propTypes = {
    data: PropTypes.array.isRequired
}
export default Tabbar