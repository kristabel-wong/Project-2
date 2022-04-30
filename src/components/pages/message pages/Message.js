import React, { Component } from "react";
import MessageShow from './MessageShow';
import MessageIndex from './MessageIndex';

class Message extends Component {
    render() {
        return (
            <div>
                <h1>MESSAGE WORLD</h1>
                <MessageIndex />
                <MessageShow />
            </div>
        )
    }
}

export default Message;