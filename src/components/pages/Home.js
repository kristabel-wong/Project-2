import React, { useEffect, useState } from "react";
import Dogs from "../Dogs";
import Cats from "../Cats";
import { NavLink } from "react-router-dom";
import Button from "../Button";

function Home() {
  return (
    <div>
      <h1>Adopt the perfect pet</h1>
      <p>
        Our mission is to help the pets in need of rescue and rehabilitation and
        help them find a loving home. Open your doors and hearts to pets in
        needs of a home.
      </p>
      <img
        width="400"
        height="400"
        src="https://firebasestorage.googleapis.com/v0/b/project-2-5825e.appspot.com/o/Home%2FHome%20page-img.jpg?alt=media&token=b745387c-890d-4379-a168-e1d5731334d3"
      ></img>
      <h3> Pest available for adoption nearby</h3>
      <NavLink to={"/signup"}>
        <Button content="Find out more" />
      </NavLink>
      <Dogs />
      <Cats />
    </div>
  );
}

export default Home;
