import React from 'react'
import style from './adopt.module.css'
import { db, auth } from "../../../firebase-config";
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
import { useParams } from 'react-router-dom';

function Adopt() {

    let params = useParams();

    const sendConsent = async function (user, petId) {
        const petDoc = doc(db, "pets", petId);
        const petDocSnap = await getDoc(petDoc);
        const petData = petDocSnap.data();
      
        await updateDoc(petDoc, {
          interested: [...petData.interested, user],
        });
    }

  

  return (
    <div className={style.container} >
        <h1>Adoption Guide</h1>
        
        <h2>Being Prepared</h2>

        <p>Before getting a pet it’s important to consider what is involved in being a responsible owner and to decide whether you’ll be able to meet all your pet’s needs throughout their lifetime. Pets are wonderful companions but owning one is a long-term commitment, so make sure you are ready. </p>

        <h2>Adopting:</h2>
        <div>
            <h3>Dog - Things to Consider:</h3>
            <ul>
                <li>Do I want a puppy or an adult dog?</li>
                <li>Can I cover all the financial costs of owning a dog, beyond just the purchase price, including food, bedding, toys and veterinary check-ups and treatment including emergencies?</li>
                <li>Is my home safe, secure and suitable for a dog?</li>
                <li>Do I have time to train and socialise a dog?</li>
                <li>Will I be able to provide them with enough company so they don’t get lonely or bored? A dog that doesn’t receive enough attention is unlikely to become a social and well-behaved pet.</li>
                <li>Do I have time to walk and play with a dog every day?</li>
                <li>Am I ready to make a 15-year commitment?</li>
            </ul>

        <p>Your local RSPCA or vet can give you more information about what it takes to raise a polite and well-balanced puppy and care for it throughout its lifetime. If you think you are ready to welcome a new puppy or dog into your life, then it is time to carefully consider what type of dog will suit you.</p>

        <h3>Caring for your dog</h3>
            <p>Introducing your new puppy or dog to your home, friends and family is a fun and exciting time. Before you bring your new pet home, be sure to read up on how to provide the best care for your new four-legged friend.</p>
            <ul>
                <li>Do I have a clean, comfortable, safe and secure home for my dog?</li>
                <li>Do I have food, bedding, dog toys and walking equipment ready?</li>
                <li>Have I organised where I will take my dog for training and to learn how to make friends?</li>
                <li>Have I located a veterinary clinic?</li>
                <li>Do I know about desexing, microchipping and registration requirements, vaccinations and preventative health care (such as worming, flea and tick prevention)?</li>
            </ul>
        </div>

        <div className={style.cats}>
            <h3>Cat - Things to Consider:</h3>
            <p>Bringing a new cat or kitten home is a wonderful, exciting experience. It is very important that you take the time to help your new family member feel safe and comfortable in their new surroundings, so the whole family can enjoy this new relationship. </p> 
            <p>Although cats are often independent and seem quite self-sufficient, it is important to remember that they do require lots of care and affection from their people. </p>
            <p>The RSPCA recommends that owned cats should be kept safe and happy at home, ideally all of the time to protect them from the dangers of roaming. Cats should confined at a minimum from dusk to dawn. This helps to reduce the risk of accidents and fights and provide some protection to wildlife. For information on how to care for your new cat, check out the RSPCA Knowledgebase.</p>
        </div>

        <div>
            <em>The above information has come from the RSCPA. For more information, please visit the <a href='https://www.rspca.org.au/adopt-pet'>RSPCA</a> about adopting pets. </em>
        </div>

        <button className={style.consent} onClick={() => sendConsent(auth.currentUser.uid, params.id)}>I understand and consent, send my interest to the owner! </button>
        {/* need a redirect here.*/}
    </div>

  )
}

export default Adopt