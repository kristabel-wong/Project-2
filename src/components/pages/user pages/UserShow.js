import { useParams } from "react-router-dom";
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
import { NavLink } from "react-router-dom";
// import { Firestore, firebase } from "firebase/firestore";

function User() {
  let params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const [userFavPets, setUserFavPets] = useState([]);

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

  const getUserFavPets = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    const data = userDocSnap.data();
    const petIdArr = data.petArr;
    let petArray = [];
    const q = query(collection(db, "pets"), where("__name__", "in", petIdArr));
    const petDoc = await getDocs(q);
    console.log(petDoc);
    petDoc.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    // for (let i = 1; i < data.petArr.length; i++) {
    //   const ref = collection(db, "pets");
    //   const doc = await getDoc(ref, data.petArr[i]);
    //   petArray.push(doc);

    //   // const q = query(
    //   //   collection(db, "pets"),
    //   //   where("uid", "==", data.petArr[i])
    //   // );
    //   // const petDoc = await getDoc(q);
    //   debugger;
    //   // petArray.push(petDoc);s
    //   // const userDocSnap = await getDoc(userDocRef);
    // }
    // console.log(petArray);

    // const q = query(petsRef, where("user_uid", "==", uid));
    // const petsData = await getDocs(q);
    // // get pet id to set the key when rendering
    // setUserFavPets(petsData.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
  };

  useEffect(() => {
    if (userInfo === null) {
      getUser(params.id);
      getUserPets(params.id);
      getUserFavPets(params.id);
    }
  }, []);

  return (
    <div>
      <div>
        {userInfo === null ? (
          ""
        ) : (
          <div>
            <h3>First Name: {userInfo.firstName}</h3>
            <h3>Last Name: {userInfo.lastName}</h3>
            <h4> Email: {userInfo.email} </h4>
            <h4> Location: {userInfo.location} </h4>
            <h4> Description: {userInfo.description} </h4>
            <img
              src={
                userInfo.imageUrl ||
                "https://firebasestorage.googleapis.com/v0/b/project-2-5825e.appspot.com/o/user%2Fdefault_user.png?alt=media&token=ec9fe5f4-8348-41e3-8bef-abe7849e5d46"
              }
            />
            <div>
              {params.id === auth.currentUser.uid ? (
                <div>
                  <NavLink to={`/user/edit/${params.id}`}>
                    <button>Edit</button>
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </div>
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
      <div>
        <div>My Fav pets</div>
      </div>
    </div>
  );
}

export default User;
