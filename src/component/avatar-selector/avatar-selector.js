import React from 'react'
import { Grid, List } from 'antd-mobile'

const avatars = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                .split(',')
                .map(v=>({
                    icon:require(`./avatars/${v}.png`),
                    text:v
                }))

class AvatarSelector extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selectedAvatar:''
        }
    }

    render(){
        const heander = this.state.selectedAvatar?
        (
            <div>
                您的头像 
                <img src={this.state.selectedAvatar} alt='' width='20' height='20'/>
            </div>    
        ):'请选择头像'
        return (
            <List renderFooter={()=>heander}>
               <Grid
                    data={avatars}
                    columnNum={5}
                    onClick={(item)=>{
                        this.setState({
                            selectedAvatar:item.icon
                        })
                        this.props.selected(item.text)
                    }}
               />
            </List>
        )
    }
}

export default AvatarSelector