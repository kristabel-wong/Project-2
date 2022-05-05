import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { db } from "../firebase-config";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import styled from "styled-components";
import "@splidejs/react-splide/css";
import style from "./Cats.module.css";

function Dogs() {
	const [dogs, setDogs] = useState([]);

	const getPets = async function (pet) {
		const petsRef = collection(db, "pets");
		const q = query(petsRef, where("type", "in", [pet]), limit(8));
		const getFiles = await getDocs(q);
		const petDataArray = [];
		getFiles.forEach((pet) => {
			petDataArray.push({ petID: pet.id, ...pet.data() });
		});
		setDogs(petDataArray);
		console.log(petDataArray);
	};

	useEffect(() => {
		getPets("Dog");
	}, []);
	return (
		<div>
			<Wrapper className={style.container_dog}>
			    <div className={style.div}>
                   <h1 className={style.home_title}> 🐕 Some of our available Dog! 🐕</h1>
                </div>
				<Splide
					options={{
						perPage: 4,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "0.5rem",
					}}
					style={{width:"80%", margin:"auto"}}
				>
					{dogs.map((dog) => {
						return (
							<SplideSlide key={dog.petID}>
								<Card>
									<p>{dog.name}</p>
									<img
										src={dog.imagesUrl[0]}
										alt={dog.name}
									/>
									<Gradient />
								</Card>
							</SplideSlide>
						);
					})}
				</Splide>
			</Wrapper>
		</div>
	);
}

const Wrapper = styled.div`
	margin: 4rem 0rem;
`;
const Card = styled.div`
	height: 15rem;
	border-radius: 1rem;
	position: reletive;

	img {
		border-radius: 1rem;
		position: absolute;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	p {
		position: absolute;
		z-index: 10;
		top: 50%;
		left: 50%;

		transform: translate(-50%, 0%);
		color: white;
		width: 100%;
		text-align: center;
		font-weight: 600;
		font-size: 1.5vw;
		height: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
const Gradient = styled.div`
	background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
	position: absolute;
	z-index: 3;
	width: 100%;
	height: 100%;
	overflow: hidden;
	border-radius: 1rem;
`;

export default Dogs;
