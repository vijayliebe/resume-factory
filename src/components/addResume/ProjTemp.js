import React, {useState, useEffect} from 'react';

export const ProjTemp = (props) => {
    console.log("proj1...");
    useEffect((e)=>{
                console.log("proj2...");
    }, []);
    return (
        <div>
            Projects
            {console.log("proj3...")}
        </div>
    )
}