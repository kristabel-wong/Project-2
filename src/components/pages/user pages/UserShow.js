import { link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

// this is just for example for setting up routes dont use this
function User() {
  let params = useParams();

  const [userInfo, setUserInfo] = useState({});
 
console.log(userInfo)

  const getUser = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    const data = userDocSnap._document.data.value.mapValue.fields;

    setUserInfo(data);
  
  };

  useEffect(() => {
    getUser(params.id);
  }, [params.id]);

  return (
    <div>
      <div>user</div>
    </div>
  );
}

export default User;
