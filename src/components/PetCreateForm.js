import React, { Component } from "react";
import { useState, useEffect,useCallback} from "react";
import { NavLink } from "react-router-dom"; 
import {useDropzone} from "react-dropzone";
import { db, storage, auth } from "../firebase-config";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from "uuid"; // generate uniq image name
import style from "./PetCreateForm.module.css";
import Typewriter from "typewriter-effect"; // give the typing text effect



function PetCreateForm() {
  
    
    // store all new info of a pet into seperate states
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [newDOB, setNewDOB] = useState(null);
    const [newType, setNewType] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newUserID, setNewUserID] = useState("");
  
   
    const [selectedImages, setSelectedImages] = useState([]);
    const onDrop = useCallback(acceptedFiles => {
        const arr = acceptedFiles.map((file)=> file, ...selectedImages)
        setSelectedImages(arr.map(file=>
            Object.assign(file,{
               preview:URL.createObjectURL(file)
            })
            ))
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop})
    const selected_images = selectedImages?.map(file=>(
        <div>
            <img src={file.preview} style={{width:"200px"}}/>
        </div>
    ))  



    const fetchUser = async () =>{
        if(newUserID ==""){
          const uid = await auth.currentUser.uid;
          setNewUserID(uid);
        }else{
            return
        }
    }

    if(newUserID ==""){
        fetchUser();
    }
    
    const createPet = async () => { 
        const petNewRef = collection(db, "pets");  
        console.log("this is the pet new ref" + JSON.stringify(petNewRef));
        const petRef = await  addDoc(petNewRef, {
                name: newName,
                age: newAge,
                dob: newDOB,
                type: newType,
                gender: newGender,
                location: newLocation,
                description: newDescription,
                user_uid: newUserID,
                imagesUrl: [],
            })

            await Promise.all(
                selectedImages.map(image=>{
                    const imageRef = ref(storage, `images/pets/${v4()+image.path}`);
                    console.log("url is", `images/pets/${v4()+image.path}`);
                    console.log('image ref:', imageRef);
                    uploadBytes(imageRef, image, "data_url").then(async()=>{
                        const downloadUrl = await getDownloadURL(imageRef)
                        console.log(JSON.stringify)
                        await updateDoc(doc(db, "pets",petRef.id ),{
                            imagesUrl: arrayUnion(downloadUrl)
                        })
                        console.log(downloadUrl)
                    })
                   
                })
            )
        
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
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="otherPet">Other pets</option>
                </select>

                <label className={style.form_label}>Gender:</label>
                <input className={style.form_field} required onChange={(event)=>{setNewGender(event.target.value)}}/>

                <label className={style.form_label}>Location:</label>
                <input className={style.form_field} required onChange={(event)=>{setNewLocation(event.target.value)}}/>
                <div className={style.drop_image_box}>
                    <div>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drop the files here ...</p>
                        </div>
                        {selected_images}
                    </div>
                </div>
                   
                

                <label className={style.form_label}>Description:</label>
                <textarea className={style.form_textarea} required rows="10" onChange={(event)=>{setNewDescription(event.target.value)}}/>
               
                <NavLink to={`/pet/index`} className={style.upload_button} onClick={createPet}> Submit Form </NavLink>
                
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
