import React from "react";

import { NavLink } from "react-router-dom";
import Dogs from "../Dogs";
import Cats from "../Cats";

function Home() {
	return (
		<div>
			<Dogs />
			<Cats />
		</div>
	);
}

export default Home;
