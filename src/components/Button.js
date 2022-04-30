import React from "react";

function Button({ content, classnames }) {
	return <button className={classnames}>{content}</button>;
}

export default Button;
