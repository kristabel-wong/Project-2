import { useState, useEffect } from "react";
import { db, storage } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function PetCreateForm() {
	// store all pets info as state
	const [pets, setPets] = useState([]);

	// store all new info of a pet into seperate states
	const [newName, setNewName] = useState("");
	const [newAge, setNewAge] = useState(0);
	const [newDOB, setNewDOB] = useState(null);
	const [newUrl, setNewUrl] = useState(null);

	const petsCollectionRef = collection(db, "pets");

	// you can upload a image right now
	// every time choose a file, run this function

	const onFileChange = async () => {
		if (newUrl == null) return;
		const uniqImageName = v4() + newUrl.name;
		const imageRef = ref(storage, `images/${uniqImageName}`);
		await uploadBytes(imageRef, newUrl).then(() => {
			alert("upload");
			console.log(uniqImageName);
		});
		getDownloadURL(imageRef).then((url) => {
			setNewUrl(url);
		});
	};

	const createPet = async () => {
		await addDoc(petsCollectionRef, {
			name: newName,
			age: newAge,
			dob: newDOB,
			imageUrl: newUrl,
		});
	};

	useEffect(() => {
		// get all pets info from firebase

		const getPets = async () => {
			const data = await getDocs(petsCollectionRef);
			setPets(data.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
		};
		getPets();
	}, []);

	return (
		<div>
			<label>Name:</label>
			<input
				placeholder="Enter the name of your pet..."
				required
				onChange={(event) => {
					setNewName(event.target.value);
				}}
			/>
			<label>Date of birth:</label>
			<input
				type="date"
				required
				onChange={(event) => {
					setNewDOB(event.target.value);
				}}
			/>
			<label>Age:</label>
			<input
				type="number"
				required
				onChange={(event) => {
					setNewAge(event.target.value);
				}}
			/>
			<label>Photos:</label>
			<input
				type="file"
				onChange={(event) => {
					setNewUrl(event.target.files[0]);
				}}
			/>
			<input type="submit" onClick={onFileChange} value="Upload" />
			<input type="submit" value="Submit" onClick={createPet} />

			{pets.map((pet) => {
				return (
					<div>
						<h4>Name:{pet.name}</h4>
						<h4>Age:{pet.age}</h4>
						<h4>DOB:{pet.dob}</h4>
						<h4>Type:{pet.type}</h4>
					</div>
				);
			})}
		</div>
	);
}

export default PetCreateForm;
