import { useState, useEffect } from "react";
import { db, storage, auth} from "../../../firebase-config";
import { addDoc, collection, getDoc, doc,getDocs, updateDoc} from "firebase/firestore";
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

	const getUserData = async function(user){
		const UserDoc = doc(db, "users", user)
		const DocSnap = await getDoc(UserDoc)
		return DocSnap.data()
	  }

    const handleFav = async function(pet){
		const currentUserData = await getUserData(auth.currentUser.uid);
		const petUserData = await getUserData(pet.user_uid);
		const petUser = pet.user_uid;

		console.log(currentUserData);
	
		// adding the pet into the favourites array of the user
		if ( currentUserData.favArr.includes(petUser)) {
			console.log('included')
		} else {
			const updateFavArr = doc(db, "users", auth.currentUser.uid)
			await updateDoc(updateFavArr, {favArr: [...currentUserData.favArr, petUser]})
		}
	
		// adding the user who liked the pet into the favourites array of the pet user
		if ( petUserData.favArr.includes(currentUserData.uid)) {
		  console.log ('the vote is true', pet.user_uid, pet.key.slice(2));
		} else {
		  const updatePetUserfavArr = doc(db, 'users', petUser)
		  await updateDoc(updatePetUserfavArr, {favArr: [...petUserData.favArr, currentUserData.uid]})
		}
	  }

	  const test =(item) =>{
		  console.log(item)
	  }



	return (
		<div className={style.container}>
			{pets.map((pet) => {
				return (
					
						<div className={style.pet_index_card} key={pet.id}>
							<NavLink
            					to={`/pet/${pet.id}`}
            					key={pet.id}
            				> 
						    {pet.imageUrl !== [] ? 
							   <img src={pet.imagesUrl[0]} className={style.pet_image} />
							   : " "
			                }
							<h2 className={style.pet_name}>💝{pet.name}💝</h2>
							<p>Location:{pet.location}</p>
							<p>Description:{pet.description}</p>
							</NavLink>
							<div className={style.button_div} >	
          						<button className={style.button74} onClick={()=>handleFav(pet)}>Like</button>
							</div>		
						</div>
							
					
				);
			})}
		</div>
	);
}

export default PetProfileList;
