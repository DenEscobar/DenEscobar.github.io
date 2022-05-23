import React, { Component } from 'react';


class Response extends Component {
    constructor(props) {
        super(props);
        this.state={
            prompt: null,
            response: null 
        };
    }

    render() {
        return(
        <div className="responseBox">
            <p className="prompt">You asked: {this.props.prompt}</p>
            <p className="response">Ai-migo says: {this.props.res}</p>
        </div>    
        )
    }
}

export default Response