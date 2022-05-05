import { useState, useEffect } from "react";
import { db, storage, auth} from "../../../firebase-config";
import { addDoc, collection, getDoc, doc,getDocs, updateDoc} from "firebase/firestore";
import { NavLink } from "react-router-dom";
import style from "./PetProfileList.module.css";

function PetProfileList() {
	// store all pets info as state
	const [pets, setPets] = useState([]);
	const [filterPets, setFilterPets] =useState([]);
  
	// get all pets info from firebase
	const getPets = async () => {
		const petsCollectionRef = collection(db, "pets");
		const data = await getDocs(petsCollectionRef);
		setPets(data.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
	};

	const filteredPets = () => {
		const filterPets = pets.filter((pet) => pet.user_uid != auth.currentUser.uid && pet.isAdopted === false);
		setFilterPets(filterPets);
	}

	const getUserData = async function(user){
		const UserDoc = doc(db, "users", user)
		const DocSnap = await getDoc(UserDoc);
		return DocSnap.data()
	  }

	const handleFav = async function (pet) {
		const currentUserData = await getUserData(auth.currentUser.uid);
		const petUserData = await getUserData(pet.user_uid);
		const petUser = pet.user_uid;
		const petId = pet.id;
		const updatePetInterestedArr = doc(db, 'pets', petId)
		const petSnap = await getDoc(updatePetInterestedArr);
		const petData = petSnap.data();
    
		if( !petData.interested.includes(currentUserData.uid)){
     	 	await updateDoc(updatePetInterestedArr, {interested: [...pet.interested, currentUserData.uid]})
	    }
		if (currentUserData.favArr.includes(petUser)) {
		  if (currentUserData.petArr.includes(pet.id)) {
			return;
		  } else {
			const updateFile = doc(db, "users", auth.currentUser.uid);
			await updateDoc(updateFile, {
			  petArr: [...currentUserData.petArr, pet.id],
			});
		  }
		} else {
		  const updateFile = doc(db, "users", auth.currentUser.uid);
		  await updateDoc(updateFile, {
			favArr: [...currentUserData.favArr, petUser],
			petArr: [pet.id, ...currentUserData.petArr],
		  });
		}
	
		if (petUserData.favArr.includes(currentUserData.uid)) {
		  console.log(
			"the vote is true",
			pet.user_uid,
			pet.id
		  );
		} else {
		  const updatePetUserfavArr = doc(db, "users", petUser);
		  await updateDoc(updatePetUserfavArr, {
			favArr: [...petUserData.favArr, currentUserData.uid],
		  });
		}
	  };

    const test =(item) =>{
		console.log(item)
	}

	// truncate description ( for long descriptions - don't fit on cards)
	const truncate = (input) => input?.length > 100 ? `${input.substring(0,90)}...` : input;
	// pageload useEffect
	useEffect(() => {
		getPets();		
	}, [])
	// we know use effect now...
	// useEffect for state
	useEffect(() => {
		filteredPets()
	}, [pets]);

	return (
		<div className={style.container}>
			{filterPets.map((pet) => {
				return (
						<div className={style.pet_index_card} key={pet.id}>
							<NavLink
            					to={`/pet/${pet.id}`}
            					key={pet.id}
								style={{color:"black"}}
            				> 
						    {pet.imageUrl !== [] ? 
							   <img src={pet.imagesUrl[0]} className={style.pet_image} />
							   : " "
			                }
							<h2 className={style.pet_name}>💝{pet.name}💝</h2>
							<div className={style.text_align}>
							<p style={{fontWeight:"bold", fontSize:"20px", color:"#006E7F", marginBottom:"20px"}}>🏠 {pet.location}</p>
							</div>
							<p style={{fontStyle:"italic",textAlign:"center"}}>{truncate(`${pet.description}`)}</p>
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
