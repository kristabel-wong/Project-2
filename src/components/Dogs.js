import React, { useEffect, useState } from "react";
// import { Splide, SplideSlide } from "@splidejs/splide";
// import { db } from "../firebase-config";
// import { collection, query, where, limit } from "firebase/firestore";

function Dogs() {
	const [dogs, setDogs] = useState([]);

	// const getPets = async function () {
	// 	const petsRef = collection(db, "pets");
	// 	const q = query(petsRef, where("type", "in", "dog"), limit(6));
	// 	console.log(q.data());
	// 	let dogsArray = [];
	// };

	// useEffect(() => {
	// 	getPets();
	// }, []);
	return <div>Dogs</div>;
}

export default Dogs;
