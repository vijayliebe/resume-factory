import React, { useState } from 'react';
import {AddResume} from '../components/AddResume';
import {ListResume} from '../components/ListResume';
import Button from '@mui/material/Button';
import { Add, Delete } from '@mui/icons-material';

export const ResumeFactory = () => {
    const styles = {
        addResume: {
            boxSizing: "border-box"
        },
        listResume: {
            marginTop: "1em",
            boxSizing: "border-box"
        } 
    }
    const [showAddResume, setShowAddResume] = useState(true);

    const addResumme = () => {
        console.log("addResumme btn clicked !!!");
        setShowAddResume(true);
    }

    const closeForm = () => {
        setShowAddResume(false);
    }

    return (
        <div className="main-cont">
            <div style={styles.addResume}>
                {showAddResume && <AddResume closeForm={closeForm} /> }
                {/* <button className="addBtn pr" onClick={()=>{addResumme()}}>ADD</button> */}
                

                <Button className="pr" variant="contained" color="success" onClick={()=>{addResumme()}}>
                    <Add /> &nbsp; ADD
                </Button>
            </div>
            <div className="clear"></div>
            <div style={styles.listResume}>
                <ListResume />
            </div>
        </div>
    );
}