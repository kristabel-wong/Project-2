import { link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// user show page

// this is just for example for setting up routes dont use this
function User() {
  let params = useParams();
  const [userInfo, setUserInfo] = useState([]);

  async function getUser(id) {
    // get data from db here
    setUserInfo("data");
  }

  useEffect(() => {
    getUser(params.type);
  }, [params.type, userInfo]);

  return <div>User</div>;
}

export default User;
