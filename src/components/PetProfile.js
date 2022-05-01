import { useState, useEffect } from "react";
import { db, storage, auth } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PetProfile() {

}