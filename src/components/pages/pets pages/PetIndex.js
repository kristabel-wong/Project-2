// index all favourited pets for a user
import React, {Component, useState, useEffect} from "react";
import PetProfileList from "./PetProfileList";

function PetIndex() {

    const [pets, setPets] = useState([]);

    
        return(
            <div>
                <PetProfileList />
            </div>
        )
}

export default PetIndex;