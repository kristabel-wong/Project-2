import { useState, useEffect } from "react";
import { db, storage } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";
import "./PetCreateForm.css"


function PetCreateForm() {
    // store all pets info as state
    const [pets, setPets] = useState([]);

    // store all new info of a pet into seperate states
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [newDOB, setNewDOB] = useState(null);
    const [newUrl, setNewUrl] = useState(null);
    const [newType, setNewType] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newDescription, setNewDescription] = useState("");


    const petsCollectionRef = collection(db, "pets");



    // you can upload a image right now
    // every time choose a file, run this function
    const onFileChange = async ( ) =>{
        if(newUrl == null) return;
        const uniqImageName = v4()+newUrl.name;
        const imageRef = ref(storage, `images/${uniqImageName}`)

        // you need use then() to handle promises, it NEED time to fetch the info! or use await!
        await uploadBytes(imageRef, newUrl).then(()=>{
           alert("File upload");
        });

        getDownloadURL(imageRef).then((url)=> {setNewUrl(url)})
    }
    
    const createPet = async () => {   
          await addDoc(petsCollectionRef, {
                name: newName,
                age: newAge,
                dob: newDOB,
                type: newType,
                imageUrl : newUrl,
                gender: newGender,
                location: newLocation,
                description: newDescription
            })  
    }

    useEffect(()=>{
         // get all pets info from firebase

        const getPets = async () =>{
           const data = await getDocs(petsCollectionRef);
           setPets(data.docs.map((pet)=> ({...pet.data(), id: pet.id}) ))
        };
        getPets();
    },[])

        return(
            <div className="container">  
                <h1 className="form-title">🐕 Describe your pet 🐈 </h1>           
                <label className="form-label" >Name:</label>
                <input className="form-field" placeholder="Enter the name of your pet..." required onChange={(event)=>{setNewName(event.target.value)}}/>

                <label className="form-label">Date of birth:</label>
                <input className="form-field" type="date" required onChange={(event)=>{setNewDOB(event.target.value)}}/>

                <label className="form-label">Age:</label>
                <input className="form-field" type="number" required onChange={(event)=>{setNewAge(event.target.value)}}/>

                <label className="form-label">Type:</label>
                <input className="form-field" required onChange={(event)=>{setNewType(event.target.value)}}/>

                <label className="form-label">Gender:</label>
                <input className="form-field" required onChange={(event)=>{setNewGender(event.target.value)}}/>

                <label className="form-label">Location:</label>
                <input className="form-field" required onChange={(event)=>{setNewLocation(event.target.value)}}/>
    
                <label className="form-label">Photos:</label>
                <input className="form-field" type="file" onChange={(event) =>{setNewUrl(event.target.files[0])}}/>
                <button className="upload-button" onClick={onFileChange} value="Upload" > Upload Image </button>

                <label className="form-label">Description:</label>
                <textarea className="form-textarea" required rows="10" onChange={(event)=>{setNewDescription(event.target.value)}}/>

                <button className="upload-button" onClick={createPet}> Submit Form </button>

                <div className="animation-dog">
                    <div className="dog">
                        <div className="body"></div>
                        <div className="neck"></div>
                        <div className="leg1"></div>
                        <div className="leg2"></div>
                        <div className="leg3"></div>
                        <div className="leg4"></div>
                        <div className="belly"></div>
                        <div className="nose"></div>
                        <div className="eye"></div>
                        <div className="eyeball"></div>
                        <div className="ear1"></div>
                        <div className="ear2"></div>
                        <div className="tail"></div>
                        <div className="tongue"></div>
                        <div className="shadow"></div>

                    </div>

                </div>

            </div>

        )
}

export default PetCreateForm;
