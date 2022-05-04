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
import style from "./UserShow.module.css";

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
    const q = query(collection(db, "pets"), where("__name__", "in", petIdArr));
    const petDoc = await getDocs(q);
    let petArray = [];
    petDoc.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      petArray.push({ id: doc.id, ...doc.data() });
    });
    setUserFavPets(petArray);
  };

  useEffect(() => {
    if (userInfo === null) {
      getUser(params.id);
      getUserPets(params.id);
      getUserFavPets(params.id);
    }
  }, []);

  const truncate = (input) =>
    input?.length > 30 ? `${input.substring(0, 25)}...` : input;

  const getAge = function (dob) {
    if (dob !== null) {
      let formattedDob =
        dob.split("-").reverse().splice(0, 2).reverse().join("/") +
        "/" +
        dob.split("-").reverse().splice(2).join();
      let today = new Date(); // MM/DD/YYYY format, and formattedDob changes data from YYYY/MM/DD to this format
      let birthDate = new Date(formattedDob);
      let age = today.getFullYear() - birthDate.getFullYear();
      let m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.profile}>
        {userInfo === null ? (
          ""
        ) : (
          <div className={style.profileInfo}>
            <div className={style.profileImage}>
              <img
                src={
                  userInfo.imageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/project-2-5825e.appspot.com/o/user%2Fdefault_user.png?alt=media&token=ec9fe5f4-8348-41e3-8bef-abe7849e5d46"
                }
              />
            </div>
            <h3>First Name:</h3>
            <p>{userInfo.firstName}</p>
            <h3>Last Name:</h3>
            <p>{userInfo.lastName}</p>
            <h3>Email:</h3>
            <p>{userInfo.email}</p>
            <h3>Location:</h3>
            <p>{userInfo.location}</p>
            <h3>Description:</h3>
            <p>{userInfo.description}</p>
            <div>
              {params.id === auth.currentUser.uid ? (
                <div className={style.edit}>
                  <NavLink to={`/user/edit/${params.id}`}>
                    <button className={style.button74}>Edit</button>
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>

      <div className={style.petContainer}>
        <div>
          {userPets.length < 1 ? (
            ""
          ) : (
            <div>
              <h1>My Pets</h1>
              <div className={style.pets}>
                {userPets.map((pet) => {
                  return (
                    <NavLink to={`/pet/${pet.id}`} key={pet.id}>
                      <div key={pet.id} className={style.petTile}>
                        <div
                          className={style.image}
                          style={{
                            backgroundImage: `url(${pet.imagesUrl[0]})`,
                          }}
                        ></div>
                        <h2>
                          {pet.name}, {pet.age == 0 ? getAge(pet.dob) : pet.age}
                        </h2>
                        <h4 className={style.capital}>{pet.location}</h4>
                        <h4 className={style.capital}>{pet.gender}</h4>
                        <h5>
                          {" "}
                          <em>{truncate(pet.description)}</em>
                        </h5>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          {userFavPets.length < 1 ? (
            ""
          ) : (
            <div>
              <h1>Liked Pets</h1>
              <div className={style.pets}>
                {userFavPets.map((pet) => {
                  return (
                    <NavLink to={`/pet/${pet.id}`} key={pet.id}>
                      <div key={pet.id} className={style.petTile}>
                        <div
                          className={style.image}
                          style={{
                            backgroundImage: `url(${pet.imagesUrl[0]})`,
                          }}
                        ></div>
                        <h2>
                          {pet.name}, {pet.age == 0 ? getAge(pet.dob) : pet.age}
                        </h2>
                        <h4 className={style.capital}> {`${pet.location}`}</h4>
                        <h4 className={style.capital}>{pet.gender}</h4>
                        <h5>
                          <em>"{truncate(pet.description)}"</em>
                        </h5>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
