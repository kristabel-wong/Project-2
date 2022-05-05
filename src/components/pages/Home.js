import React, { useEffect, useState ,useContext} from "react";
import Dogs from "../Dogs";
import Cats from "../Cats";
import { auth } from "../../firebase-config";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { AuthContext } from "../../context/auth";
import style from "./Home.module.css";

function Home() {
  const { user } = useContext(AuthContext);
  const logout = async () => {
    await auth.signOut();
  };
  let uid;
  if (user !== null) {
    uid = user.uid;
  }
  return (
    <div>
     {!user ? (
               <>
                 <div className={style.container}>   
                    <div className={style.centerDiv}>
                        <h1 className={style.title}>Adopt the perfect pet</h1>
                        <p className={style.des}>
                          Our mission is to help the pets in need of rescue and rehabilitation and
                          help them find a loving home. Open your doors and hearts to pets in
                          needs of a home.
                        </p>
                        <div style={{textAlign:"center"}}>
                           <h3 className={style.sub_title}> Pest available for adoption nearby</h3>
                           <NavLink to={"/signup"} className={style.button87}>
                              Start your search
                           </NavLink>
                        </div>
                    </div>
                 </div> 
               </>
            ) : (
               <>   
                 <div>
                    <Dogs />
                    <Cats />
                 </div>
               </>
            )
      }
   </div>
  )
}

export default Home;
