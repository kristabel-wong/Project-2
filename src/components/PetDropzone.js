import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {db, storage} from "../firebase-config"
import {addDoc, collection} from "firebase/firestore"

const PetDropzone =() =>{
    
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
    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop the files here ...</p>
            </div>
            {selected_images}
        </div>
    
    )
}

export default PetDropzone
