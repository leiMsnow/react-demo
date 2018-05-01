import React from 'react'
import { Button } from 'antd-mobile'

export default class Message extends React.Component{

    render(){
        return(
            <div>
                <Button onClick={()=>{console.log('1111')}}>
                    hello
                </Button>
            </div>
        )
    }
}