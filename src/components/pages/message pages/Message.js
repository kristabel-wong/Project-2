import React, { Component } from "react";
import MessagesList from "./MessagesList";

class Message extends Component {
	render() {
		return (
			<div className="content-container">
				<MessagesList />
			</div>
		);
	}
}

export default Message;
