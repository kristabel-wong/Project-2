import React, { Component } from "react";
import MessagesList from "./MessagesList";
import styles from "./message.module.css";

// main message render page for use in routes
class Message extends Component {
	render() {
		return (
			<div className={styles.contentContainer}>
				<MessagesList />
			</div>
		);
	}
}

export default Message;
