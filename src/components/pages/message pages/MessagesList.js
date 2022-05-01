import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import ChatBox from "./ChatBox";

import User from "../../User";

function MessagesList() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const user1 = auth.currentUser.uid;
  const user2 = chat.uid;
  console.log(user2);
  useEffect(() => {
    const usersRef = collection(db, "favourites");
    const q = query(usersRef, where("favuid", "not-in", [user1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let usersArr = [];
      querySnapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });
      setUsers(usersArr);
    });
    return () => unsub();
  }, []);

  const selectUser = function (user) {
    setChat(user);
  };
  return (
    <div className="users-container">
      <div>
        {users.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
      <div className="chatbox-container">
        {chat ? (
          <div>
            <h3>{chat.person}</h3>
            <ChatBox user1={user1} user2={user2} messages={messages} />
          </div>
        ) : (
          <div>
            <h3>Select a user</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesList;
