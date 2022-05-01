import { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";


function PetProfileList () {

    // store all pets info as state
    const [pets, setPets] = useState([]);
    const petsCollectionRef = collection(db, "pets");
    
    useEffect(()=>{
        // get all pets info from firebase
       const getPets = async () =>{
          const data = await getDocs(petsCollectionRef);
          setPets(data.docs.map((pet)=> ({...pet.data(), id: pet.id}) ))
       };
       getPets();
   },[])


    return(
        <div>
            {pets.map((pet)=>{
                return  <div key={pet.id}>
                          <h2>Name:{pet.name}</h2>
                          <h4>Location:{pet.location}</h4>
                          <h4>Gender:{pet.gender}</h4>
                          <h4>Age:{pet.age}</h4>
                          <h4>DOB:{pet.dob}</h4>
                          <h4>Description:{pet.description}</h4>
                          <img src={pet.imageUrl} />
                        </div>      
            })}
        </div>
    )
}

export default PetProfileList;