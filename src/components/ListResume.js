import React from 'react';
import { Edit, Delete, Download, Preview } from '@mui/icons-material';
import { IconButton, Tooltip } from "@mui/material";

export const ListResume = (props) => {
    const styles = {
        listRowFirst: {
            fontWeight: "bold"
        },
        listRow: {
           borderBottom: "1px solid #ccc",
           marginBottom: "12px"
        },
        listCol: {
            width: "calc(100% /3)",
            boxSizing: "border-box",
            padding: "5px"
        }
    }

    const deleteResume = () => {

    }

    const editResume = () => {
        
    }

    const downloadResume = () => {
        
    }
    return (
        <div className="page-cont">
            <hr/>
            <div style={styles.listRowFirst}>
                <div className="fl" style={styles.listCol}>Resume Name</div>
                <div className="fl" style={styles.listCol}>Role</div>
                <div className="fl" style={styles.listCol}>Actions</div>
                <div className="clear"></div>
            </div>
            <hr/>
            {props?.resumes?.map((r, i)=>{
                return <div key={'resume'+i} style={styles.listRow}>
                                            <div className="fl" style={styles.listCol}>{r?.general?.resumeName}</div>
                                            <div className="fl" style={styles.listCol}>{r?.general?.title}</div>
                                            <div className="fl" style={styles.listCol}>
                                                <Tooltip title="Edit" placement="bottom">
                                                    <IconButton onClick={()=>{editResume(i)}}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" placement="bottom">
                                                    <IconButton onClick={()=>{deleteResume(i)}}>
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Download" placement="bottom">
                                                    <IconButton onClick={()=>{downloadResume(i)}}>
                                                        <Download />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Change Template" placement="bottom">
                                                    <IconButton onClick={()=>{downloadResume(i)}}>
                                                        <Preview />
                                                    </IconButton>
                                                </Tooltip>
                                            
                                            </div>
                                            <div className="clear"></div>
                       </div>                  
            })}
        </div>
    )
}