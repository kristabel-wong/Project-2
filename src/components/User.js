import React from "react";

function User({ user, selectUser }) {
	return (
		<div className="user-wrapper" onClick={() => selectUser(user)}>
			<div className="user-info">
				<img src={user.avatar} alt={user.person} className="avatar" />
				<h4>{user.name}</h4>
				<div></div>
			</div>
		</div>
	);
}

export default User;
