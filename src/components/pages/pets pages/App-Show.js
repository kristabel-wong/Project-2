import { useState, useEffect } from "react";
import { db, auth } from "../../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import styles from "./styles.module.css";
import { Stack } from "./stack";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";


function App() {
	const Wrapper = styled(Stack)`
		background: #ffffff;
        border-radius: 50px;
	`;

	const Item = styled.div`
		background: #f9fafb;
		width: 400px;
		height: 550px;
		text-shadow: 0 10px 10px #d1d5db;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		padding: 10px;
		transform: ${() => {
			let rotation = Math.random() * (5 - -5) + -5;
			return `rotate(${rotation}deg)`;
		}};
	`;

	const [pets, setPets] = useState([]);

	// get all pets info from firebase
	const getPets = async () => {
		const petsCollectionRef = collection(db, "pets");
		const data = await getDocs(petsCollectionRef);
		setPets(data.docs.map((pet) => ({ ...pet.data(), id: pet.id })));
	};

	useEffect(() => {
        if (pets !== []) {
            getPets();
        }  
	}, []);


    // filter out users own pets 
    // let filterPets = function () { pets.filter(pet => {
    //     pet.user_uid != auth.currentUser.uid;
    //     !pet.id.includes(auth.currentUser.petArr) 
    // })}
    let filterPets = pets.filter(pet => pet.user_uid != auth.currentUser.uid);

    // shuffle pets
    function shuffle (array) {
        let currentIndex = array.length, tempValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            tempValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempValue;
        }
        return array
    }
    
    // truncate description ( for long descriptions - don't fit on cards)
    const truncate = (input) => input?.length > 100 ? `${input.substring(0,90)}...` : input;

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
        <div>
            
                <h1 className={styles.heading} >
                    <NavLink to={"/pet/index"} className={styles.link}>
                        <span>🐶</span> List View <span>🐰</span>
                    </NavLink>
                </h1>

            <div className={styles.showPage}>
                <div className={styles.dislike}> </div>
                <div className={styles.deck}>
                    <Wrapper onVote={(item, vote) => console.log(item.props, vote)}>
                        {shuffle(filterPets).map((pet) => { 
                            return (
                                <Item
                                    data-value={pet.user_uid}
                                    whileTap={{ scale: 1.15 }}
                                    key={pet.id}
                                >
                                    <div
                                        className={styles.imageContainer}
                                        style={{
                                            backgroundImage: `url(${pet.imagesUrl[0]})`,
                                        }}
                                    ></div>
                                    <div>
                                        <h2 className={styles.petName}>
                                            {pet.name}, {pet.age == 0 ? getAge(pet.dob) : pet.age}
                                        </h2>
                                        <p className={styles.petDetails}>
                                            {pet.location}
                                        </p>
                                        <p className={styles.petDetails}>
                                            {pet.gender}
                                        </p>
                                        <p className={styles.petDetails}>
                                            {truncate(`${pet.description}`)}
                                        </p>
                                        {/* <p className={styles.petDetails}>
                                            {auth.currentUser.uid}
                                        </p>
                                        <p className={styles.petDetails}>
                                            {pet.user_uid}
                                        </p> */}
                                    </div>
                                </Item>
                            );
                        })}
                    </Wrapper>
                </div>
                <div className={styles.like}></div>
            </div>
        </div>
	);

    //                     <div>
    //                         <NavLink to="/message">
    //                             <button>
    //                                 <h3 className={styles.petName}>{pet.name}, {pet.age}</h3>
    //                             </button>
    //                         </NavLink>
    //                         <p className={styles.petDetails}>{pet.location}</p>
    //                         <p className={styles.petDetails}>{pet.description}</p>
    //                         <p className={styles.petDetails}>{auth.currentUser.uid}</p>
    //                         <p className={styles.petDetails}>{pet.id}</p>
    //                         <p className={styles.petDetails}>{pet.user_uid}</p>

	// //                         <div>
	// //                             <h3 className={styles.petName}>Pits</h3>
	// //                             <p className={styles.petDetails}>Brisbane</p>
	// //                             <p className={styles.petDetails}>I'm a bit shy</p>
	// //                         </div>
	// //                     </Item>
	//                     <Item data-value="pancakes" whileTap={{ scale: 1.15 }}>
	//                         <div className={styles.imageContainer} style={{ backgroundImage: `url("https://scontent.fsyd4-1.fna.fbcdn.net/v/t39.30808-6/278106878_5059554534127820_4134914145649592563_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=a26aad&_nc_ohc=tDxhsLeqIToAX8HUsSj&tn=fyRfHEuqm-0XJYUQ&_nc_ht=scontent.fsyd4-1.fna&oh=00_AT_KPRBT_MimVtD9rVVWtIaMwyNXgkF-dP2TiZ_w2KUHLw&oe=6273B7A2")`}}>
	//                         </div>

	//                         <div>
	//                             <h3 className={styles.petName}>Captain Blep</h3>
	//                             <p className={styles.petDetails}>Sydney</p>
	//                             <p className={styles.petDetails}>Smol boy with a big heart (and tongue)</p>
	//                         </div>
	//                     </Item>
	//                     <Item data-value="goldie" whileTap={{ scale: 1.15 }}>
	//                         <div className={styles.imageContainer} style={{ backgroundImage: `url("https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80")`}}>
	//                         </div>

	//                         <div>
	//                             <h3 className={styles.petName}>Goldie</h3>
	//                             <p className={styles.petDetails}>Sydney</p>
	//                             <p className={styles.petDetails}>I'll be the goodest boy</p>
	//                         </div>

	//                     </Item>
	//                 </Wrapper>
	//             </div>
	//         </div>

	//   );
}

export default App;
