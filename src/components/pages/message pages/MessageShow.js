// show and send message to user
import React, { useRef, useState } from 'react';


import firebase from 'firebase/compat/app'; // for firebase SDK
import 'firebase/compat/firestore'; // for firebase store
import 'firebase/compat/auth'; // for firebase authentication


// importing hooks
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// find our firebase project and initialise it
firebase.initializeApp({
    // your config
    apiKey: "AIzaSyBJeCbzxP2zfXDQ2qo1B_9aBrCyM8wkbvM",
    authDomain: "project-2-5825e.firebaseapp.com",
    projectId: "project-2-5825e",
    storageBucket: "project-2-5825e.appspot.com",
    messagingSenderId: "1036084019168",
    appId: "1:1036084019168:web:a99cc60d4a4816cde4f585",
    measurementId: "G-9QF6W07Z6W"
})
  
// mkaing reference to firebase SDKs as global variables
  
const auth = firebase.auth();
const firestore = firebase.firestore();


function Chat() {

    // const [user] = useAuthState(auth); // signed in --> user is an object, sign out --> user is null

    return (
        <div className="Chat">
        <header>
          <h1>🐈🦙PURFECT🐶💬</h1>
          {/* <SignOut /> */}
        </header>
  
        <section>
          <ChatRoom /> {/* is user: show ChatRoom, else show SignIn */}
        </section>
  
      </div>
    );
    
}  

function SignIn() {

    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
      console.log('sign in with google');
    }
  
    const signInWithEmailAndPassword = () => {
        console.log('this was pressed'); // will work on this once user auth has been set up
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <button className='sign-in' onClick={signInWithEmailAndPassword}>Sign in with Email</button>
      </>
    )
  
}

// function SignOut() {
//     return auth.currentUser && (
//         <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//     )
// }

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages'); // this references collection name (so we can try userOne_petOne)
    // const messageRef = firestore.collection('messages').document('userone_petone').collection('messages'
    const query = messagesRef.orderBy('createdAt').limit(25); // get messaged by createdAt and show max 25 messages
  
    const [messages] = useCollectionData(query, { idField: 'id' }); // making a query for that data
  
    const [formValue, setFormValue] = useState(''); // for submitting message
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue(''); // setting message input back to nothing once sent
      dummy.current.scrollIntoView({ behavior: 'smooth' }); // ensure we always scroll to the bottom when message appears
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={dummy}></span> {/* scroll to bottom feature */}
  
      </main>
  
      <form onSubmit={sendMessage}> {/* form to submit message - writing value to firestore */}
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type Message ..." /> {/* binding state to form input */}
  
        <button type="submit" disabled={!formValue}>🕊️</button>
  
      </form>
    </>)
}
  
  
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://cdn-icons-png.flaticon.com/512/141/141783.png'} />
        <p>{text}</p>
        
      </div>
    </>)
}
  
export default Chat;