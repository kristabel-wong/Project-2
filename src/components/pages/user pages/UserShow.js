import { link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase-config";
import { doc, getDoc } from "firebase/firestore";

// this is just for example for setting up routes dont use this
function User() {
  let params = useParams();
  const [userInfo, setUserInfo] = useState(null);
  // const uid = params.id;
  let data;

  const getUser = async (uid) => {
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);
    data = await userDocSnap._document.data.value.mapValue.fields;

    setUserInfo(data);
  };

  useEffect(() => {
    if (userInfo === null) {
      getUser(params.id);
    }
  }, []);

  return (
    <div>
      <div>
        {userInfo === null ? "" : <div>{userInfo.firstName.stringValue}</div>}
      </div>
    </div>
  );
}

export default User;
