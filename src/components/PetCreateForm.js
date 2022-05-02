import React, { Component } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import { db, storage, auth } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"; // generate uniq image name
import style from "./PetCreateForm.module.css";
import Typewriter from "typewriter-effect"; // give the typing text effect


function PetCreateForm() {
    
    // store all new info of a pet into seperate states
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [newDOB, setNewDOB] = useState(null);
    const [newUrl, setNewUrl] = useState(null);
    const [newType, setNewType] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newUserID, setNewUserID] = useState("");
  
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
        getDownloadURL(imageRef).then((url)=> {setNewUrl(url)});
        
    }

    const fetchUser = () =>{
        if(newUserID ==""){
          const uid = auth.currentUser.uid;
          setNewUserID(uid);
        }else{
            return
        }
    }

    if(newUserID ==""){
        fetchUser();
    }
    
    const createPet = async () => {   
           addDoc(petsCollectionRef, {
                name: newName,
                age: newAge,
                dob: newDOB,
                type: newType,
                imageUrl : newUrl,
                gender: newGender,
                location: newLocation,
                description: newDescription,
                user_uid: newUserID,
            })  
    }

   
        return(
            <div className={style.container}>  
                <h1 className={style.form_title}>🐕 Describe your pet 🐈 </h1>           
                <label className={style.form_label} >Name:</label>
                <input className={style.form_field} placeholder="Enter the name of your pet..." required onChange={(event)=>{setNewName(event.target.value)}}/>

                <label className={style.form_label}>Date of birth:</label>
                <input className={style.form_field} type="date" required onChange={(event)=>{setNewDOB(event.target.value)}}/>

                <label className={style.form_label}>Age:</label>
                <input className={style.form_field} type="number" required onChange={(event)=>{setNewAge(event.target.value)}}/>

                <label className={style.form_label}>Type:</label>
                <select className={style.form_field} required onChange={(event)=>{setNewType(event.target.value)}}>
                    <option value="style.cat">Cat</option>
                    <option value="style.dog">Dog</option>
                    <option value="style.otherPet">Other pets</option>
                </select>

                <label className={style.form_label}>Gender:</label>
                <input className={style.form_field} required onChange={(event)=>{setNewGender(event.target.value)}}/>

                <label className={style.form_label}>Location:</label>
                <input className={style.form_field} required onChange={(event)=>{setNewLocation(event.target.value)}}/>
    
                <label className={style.form_label}>Photos:</label>
                <input className={style.form_field} type="file" onChange={(event) =>{setNewUrl(event.target.files[0])}}/>
                <button className={style.upload_button} onClick={onFileChange} value="Upload" > Upload Image </button>

                <label className={style.form_label}>Description:</label>
                <textarea className={style.form_textarea} required rows="10" onChange={(event)=>{setNewDescription(event.target.value)}}/>
                <NavLink to={"/pet/index"}>
                   <button className={style.upload_button} onClick={createPet}> Submit Form </button>
                </NavLink>
                <div className={style.animation_dog}>
                    <div className={style.dog}>
                        <div className={style.body}></div>
                        <div className={style.neck}></div>
                        <div className={style.leg1}></div>
                        <div className={style.leg2}></div>
                        <div className={style.leg3}></div>
                        <div className={style.leg4}></div>
                        <div className={style.belly}></div>
                        <div className={style.nose}></div>
                        <div className={style.eye}></div>
                        <div className={style.eyeball}></div>
                        <div className={style.ear1}></div>
                        <div className={style.ear2}></div>
                        <div className={style.tail}></div>
                        <div className={style.tongue}></div>
                        <div className={style.shadow}></div>
                        <div className={style.bubble}>
                            <Typewriter 
                            onInit={(typewriter)=>{
                                typewriter.typeString("Will you take me home? 🏡")   
                                .pauseFor(2000)
                                .deleteAll()
                                .typeString("I want to be your friend! 🐶")
                                .start()
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default PetCreateForm;
