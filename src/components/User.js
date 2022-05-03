import React from "react";

// this component is for the chat index page
function User({ user, selectUser }) {
	return (
		<div className="user-wrapper" onClick={() => selectUser(user)} >
            <h1 style={{margin: '10px', textAlign: 'center'}} >Users</h1>
			<div className="user-info" style={{display: 'grid', gridTemplateColumns: '60px 150px'}}>
				<img style={{width: '50px'}} className="userIcon"
					src={
						// user.img ||
						"https://cdn-icons-png.flaticon.com/512/141/141783.png"
					}
				/>
				
				<div style={{lineHeight: '50px'}}><h4>{user.firstName}</h4></div>
			</div>
		</div>
	);
}

export default User;
