import React from "react";

// this component is for the chat index page
function User({ user, selectUser }) {
	return (
		<div className="user-wrapper" onClick={() => selectUser(user)}>
			<div className="user-info">
				<img
					src={
						// user.img ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				<h4>{user.firstName}</h4>
				<div></div>
			</div>
		</div>
	);
}

export default User;
