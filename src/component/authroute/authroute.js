import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{

    componentDidMount(){
            axios.get('/user/info').then(res=>{
                if(res.status===200){
                    if(res.data.code === 0){

                    }else{
                        console.log(this.props.history)
                    }
                    console.log(res.data)
                }
            })
    }

    render(){
        return (
            <p>auth</p>
        )
    }
}

export default AuthRoute