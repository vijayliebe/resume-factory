import React, { useState, useEffect } from "react";
import { Add, Edit, Delete, Download, Preview } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { AddResume } from "../components/addResume/AddResume";
import Button from "@mui/material/Button";
import { ResumeService } from "../services/ResumeService";

export const ListResume = (props) => {
  const styles = {
    addResume: {
      boxSizing: "border-box",
    },
    listResume: {
      marginTop: "1em",
      boxSizing: "border-box",
    },
    listRowFirst: {
      fontWeight: "bold",
    },
    listRow: {
      borderBottom: "1px solid #ccc",
      marginBottom: "12px",
    },
    listCol: {
      width: "calc(100% /3)",
      boxSizing: "border-box",
      padding: "5px",
    },
  };

  const [showAddResume, setShowAddResume] = useState(false);
  const [resumeEditData, setResumeEditData] = useState();

  const addResumme = () => {
    console.log("addResumme btn clicked !!!");
    setResumeEditData();
    setShowAddResume(true);
  };

  const closeForm = () => {
    setShowAddResume(false);
    props.fetchResumes();
  };

  const deleteResume = (idx) => {
    console.log("deleteResume btn clicked :: idx :: ", idx, props?.resumes?.[idx]);
    ResumeService.dltResume(idx, props?.resumes?.[idx]?.id);
  };

  const editResume = (idx) => {
    console.log("editResume btn clicked :: idx :: ", idx, props?.resumes?.[idx]);
    setResumeEditData(props?.resumes?.[idx]);
    setShowAddResume(true);
  };

  const downloadResume = () => {};
  return (
    <>
      <div style={styles.addResume}>
        {showAddResume && <AddResume resumeEditData={resumeEditData}  closeForm={closeForm} />}
        {/* <button className="addBtn pr" onClick={()=>{addResumme()}}>ADD</button> */}

        <Button
          className="pr"
          variant="contained"
          color="success"
          onClick={() => {
            addResumme();
          }}
        >
          <Add /> &nbsp; ADD
        </Button>
      </div>
      <div className="clear"></div>
      <div style={styles.listResume}>
        <div className="page-cont">
          <hr />
          <div style={styles.listRowFirst}>
            <div className="fl" style={styles.listCol}>
              Resume Name
            </div>
            <div className="fl" style={styles.listCol}>
              Role
            </div>
            <div className="fl" style={styles.listCol}>
              Actions
            </div>
            <div className="clear"></div>
          </div>
          <hr />
          {props?.resumes?.map((r, i) => {
            return (
              <div key={"resume" + i} style={styles.listRow}>
                <div className="fl" style={styles.listCol}>
                  {r?.general?.resumeName}
                </div>
                <div className="fl" style={styles.listCol}>
                  {r?.general?.title}
                </div>
                <div className="fl" style={styles.listCol}>
                  <Tooltip title="Edit" placement="bottom">
                    <IconButton
                      onClick={() => {
                        editResume(i);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="bottom">
                    <IconButton
                      onClick={() => {
                        deleteResume(i);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download" placement="bottom">
                    <IconButton
                      onClick={() => {
                        downloadResume(i);
                      }}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Change Template" placement="bottom">
                    <IconButton
                      onClick={() => {
                        downloadResume(i);
                      }}
                    >
                      <Preview />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="clear"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
