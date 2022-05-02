import React, { Component } from "react";
import MessagesList from "./MessagesList";
import style from './message.module.css';

class Message extends Component {
	render() {
		return (
			<div className={style.content}>
				<MessagesList />
			</div>
		);
	}
}

export default Message;
