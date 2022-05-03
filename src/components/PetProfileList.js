import { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import style from "./PetProfileList.module.css";

function PetProfileList() {
	// store all pets info as state
	const [pets, setPets] = useState([]);

	// get all pets info from firebase
	const getPets = async () => {
		const petsCollectionRef = collection(db, "pets");
		const data = await getDocs(petsCollectionRef);
		setPets(data.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
	};
	useEffect(() => {
		getPets();
	}, []);

	return (
		<div className={style.container}>
			{pets.map((pet) => {
				return (
					<NavLink
					to={`/pet/${pet.id}`}
					key={pet.id}
					className={style.pet_index_card}
				    > 
						<div >
							<h2>Name:{pet.name}</h2>
							<h4>Location:{pet.location}</h4>
							<h4>Gender:{pet.gender}</h4>
							<h4>Age:{pet.age}</h4>
							<h4>DOB:{pet.dob}</h4>
							<h4>Description:{pet.description}</h4>
						</div>
					</NavLink>		
					
				);
			})}
		</div>
	);
}

export default PetProfileList;
