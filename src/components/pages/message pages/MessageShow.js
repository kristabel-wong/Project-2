// show and send message to user

import ChatBox from "./ChatBox";

function MessageShow() {
	return (
		<div className="Chat">
			<header>
				<h1>🐈🦙PURFECT🐶💬</h1>
				{/* <SignOut /> */}
			</header>

			<section>
				<ChatBox /> {/* is user: show ChatRoom, else show SignIn */}
			</section>
		</div>
	);
}

export default MessageShow;
//  this is also where all your favourites could be kept
