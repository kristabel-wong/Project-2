import React, { useEffect, useState } from "react";
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
