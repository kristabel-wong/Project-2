import { link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase-config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// import { async } from "@firebase/util";
import { NavLink } from "react-router-dom";

// this is just for example for setting up routes dont use this
function User() {
  let params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userPets, setUserPets] = useState([]);

  const getUser = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    const data = userDocSnap.data();

    setUserInfo(data);
  };

  const getUserPets = async (user_uid) => {
    const petsRef = collection(db, "pets");
    const q = query(petsRef, where("user_uid", "==", user_uid));
    const petsData = await getDocs(q);
    // get pet id to set the key when rendering
    setUserPets(petsData.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
  };

  useEffect(() => {
    if (userInfo === null) {
      getUser(params.id);
      getUserPets(params.id);
    }
  }, []);

  return (
    <div>
      <div>
        {userInfo === null ? (
          ""
        ) : (
          <div>
            <h2>
              Name: {userInfo.firstName} {userInfo.lastName}
            </h2>
            <h4> Email: {userInfo.email} </h4>
          </div>
        )}
      </div>
      <div>
        {userPets.length < 1 ? (
          ""
        ) : (
          <div>
            <h2>My pets</h2>
            {userPets.map((pet) => {
              return (
                <NavLink to={`/pet/${pet.id}`} key={pet.id}>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
