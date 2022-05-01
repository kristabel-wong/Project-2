import { link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc, setDoc, getDoc } from "firebase/firestore";

// this is just for example for setting up routes dont use this
function User() {
  //   let params = useParams();
  //   const [userInfo, setUserInfo] = useState([]);

  //   async function getUser(uid) {
  //     // getting data from db here

  //     setUserInfo("data");
  //   }

  //   useEffect(() => {
  //     getUser(params.id);
  //   }, [params.id, userInfo]);

  return <div>User</div>;
}

export default User;
