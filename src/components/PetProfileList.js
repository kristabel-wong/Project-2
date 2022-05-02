import { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NavLink } from "react-router-dom"; 
import style from "./PetProfileList.module.css";


function PetProfileList () {

    // store all pets info as state
    const [pets, setPets] = useState([]);
    const petsCollectionRef = collection(db, "pets");
    
    useEffect(()=>{
        // get all pets info from firebase
       const getPets = async () =>{
          const data = await getDocs(petsCollectionRef);
          // pet.id is the name of the pet file in database
          setPets(data.docs.map((pet)=> ({...pet.data(), id: pet.id}) ))
       };
       getPets();
   },[])


    return(
        <div className={style.container}>
            {pets.map((pet)=>{
                
                return  <NavLink to={`/pet/${pet.id}`} key={pet.id} className={style.pet_index_card}>
                        <div key={pet.id}>
                            <h2>Name:{pet.name}</h2>
                            <h4>Location:{pet.location}</h4>
                            <h4>Gender:{pet.gender}</h4>
                            <h4>Age:{pet.age}</h4>
                            <h4>DOB:{pet.dob}</h4>
                            <h4>Description:{pet.description}</h4>
                            <img src={pet.imageUrl} />
                        </div>  
                        </NavLink>         
            })}
        </div>
    )
}

export default PetProfileList;