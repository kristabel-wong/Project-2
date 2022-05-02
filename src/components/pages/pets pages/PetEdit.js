import React from "react";
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../../firebase-config";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NavLink, useParams } from "react-router-dom";
import { v4 } from "uuid"; // generate uniq image name
import style from "../../PetCreateForm.module.css";
import Typewriter from "typewriter-effect"; // give the typing text effect

function PetEdit() {
	let params = useParams();

	const [petInfo, setPetInfo] = useState(null);

	// store all update info of a pet into seperate states
	const [updateName, setNewName] = useState(null);
	const [updateAge, setNewAge] = useState(null);
	const [updateDOB, setNewDOB] = useState(null);
	const [updateUrl, setNewUrl] = useState(null);
	const [updateType, setNewType] = useState(null);
	const [updateGender, setNewGender] = useState(null);
	const [updateLocation, setNewLocation] = useState(null);
	const [updateDescription, setNewDescription] = useState(null);

	let data;

	// get the current pet data
	const getPet = async (uid) => {
		const petDocRef = doc(db, "pets", uid);
		const petDocSnap = await getDoc(petDocRef);
		data = petDocSnap.data();
		setPetInfo(data);
	};

	const onFileChange = async () => {
		if (updateUrl == null) return;
		const uniqImageName = v4() + updateUrl.name;
		const imageRef = ref(storage, `images/${uniqImageName}`);

		await uploadBytes(imageRef, updateUrl).then(() => {
			alert("File upload");
		});
		getDownloadURL(imageRef).then((url) => {
			setNewUrl(url);
		});
	};

	//if nothing changed, store  existing data into the update variables
	if (petInfo !== null) {
		if (updateName == null) {
			setNewName(`${petInfo.name}`);
		}
		if (updateAge == null) {
			setNewAge(`${petInfo.age}`);
		}
		if (updateDOB == null) {
			setNewDOB(`${petInfo.dob}`);
		}
		if (updateUrl == null) {
			setNewUrl(`${petInfo.imageUrl}`);
		}
		if (updateLocation == null) {
			setNewLocation(`${petInfo.location}`);
		}
		if (updateGender == null) {
			setNewGender(`${petInfo.gender}`);
		}
		if (updateType == null) {
			setNewType(`${petInfo.type}`);
		}
		if (updateDescription == null) {
			setNewDescription(`${petInfo.description}`);
		}
	}

	// update pet info
	const updatePet = async () => {
		const petDoc = doc(db, "pets", params.type);
		updateDoc(petDoc, {
			name: updateName,
			age: updateAge,
			dob: updateDOB,
			type: updateType,
			imageUrl: updateUrl,
			gender: updateGender,
			location: updateLocation,
			description: updateDescription,
		});
	};

	useEffect(() => {
		if (petInfo === null) {
			getPet(params.type);
		}
	}, []);

	return (
		<div>
			{petInfo === null ? (
				""
			) : (
				<div className={style.container}>
					<h1 className={style.form_title}>
						🐕 Update your pet's profile 🐈{" "}
					</h1>
					<label className={style.form_label}>Name:</label>
					<input
						className={style.form_field}
						defaultValue={petInfo.name}
						onChange={(event) => {
							setNewName(event.target.value);
						}}
					/>

					<label className={style.form_label}>Date of birth:</label>
					<input
						className={style.form_field}
						type="date"
						defaultValue={petInfo.dob}
						onChange={(event) => {
							setNewDOB(event.target.value);
						}}
					/>

					<label className={style.form_label}>Age:</label>
					<input
						className={style.form_field}
						type="number"
						defaultValue={petInfo.age}
						onChange={(event) => {
							setNewAge(event.target.value);
						}}
					/>

					<label className={style.form_label}>Type:</label>
					<select
						className={style.form_field}
						defaultValue={petInfo.type}
						onChange={(event) => {
							setNewType(event.target.value);
						}}
					>
						<option value="cat">Cat</option>
						<option value="dog">Dog</option>
						<option value="otherPet">Other pets</option>
					</select>

					<label className={style.form_label}>Gender:</label>
					<input
						className={style.form_field}
						defaultValue={petInfo.gender}
						onChange={(event) => {
							setNewGender(event.target.value);
						}}
					/>

					<label className={style.form_label}>Location:</label>
					<input
						className={style.form_field}
						defaultValue={petInfo.location}
						onChange={(event) => {
							setNewLocation(event.target.value);
						}}
					/>

					<label className={style.form_label}>Photos:</label>
					<input
						className={style.form_field}
						type="file"
						onChange={(event) => {
							setNewUrl(event.target.files[0]);
						}}
					/>
					<button
						className={style.upload_button}
						onClick={onFileChange}
						value="Upload"
					>
						{" "}
						Upload Image{" "}
					</button>

					<label className={style.form_label}>Description:</label>
					<textarea
						className={style.form_textarea}
						defaultValue={petInfo.description}
						rows="10"
						onChange={(event) => {
							setNewDescription(event.target.value);
						}}
					/>
					<NavLink to={`/pet/${params.type}`}>
						<button
							className={style.upload_button}
							onClick={updatePet}
						>
							{" "}
							Update Profile{" "}
						</button>
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
									onInit={(typewriter) => {
										typewriter
											.typeString(
												"Will you take me home? 🏡"
											)
											.pauseFor(2000)
											.deleteAll()
											.typeString(
												"I want to be your friend! 🐶"
											)
											.start();
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PetEdit;
