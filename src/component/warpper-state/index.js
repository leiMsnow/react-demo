import React from 'react'

export default function wrapperState(Comp) {
    return class WrapperComp extends React.Component {

        constructor(props) {
            super(props)
            this.state = {}
        }

        handleState = (key, value) => {
            this.setState({
                [key]: value
            })
            console.log(`key:${key}, value:${value}`)
        }

        render() {
            return <Comp handleState={this.handleState} state={this.state} {...this.props} />
        }
    }
}