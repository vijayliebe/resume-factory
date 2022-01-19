import React, { useState, useEffect } from "react";
import {
  Add,
  Edit,
  Delete,
  Download,
  Preview,
  Upload,
} from "@mui/icons-material";
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

  const [activeSection, setActiveSection] = useState("general");
  const [showAddResume, setShowAddResume] = useState(false);
  const [resumeEditData, setResumeEditData] = useState();

  const addResumme = () => {
    console.log("addResumme btn clicked !!!");
    setActiveSection("general");
    setResumeEditData();
    setShowAddResume(true);
  };

  const closeForm = () => {
    setShowAddResume(false);
    props.fetchResumes();
  };

  const deleteResume = (idx) => {
    console.log(
      "deleteResume btn clicked :: idx :: ",
      idx,
      props?.resumes?.[idx]
    );
    ResumeService.dltResume(props?.resumes?.[idx]?.id);
    props.fetchResumes();
  };

  const editResume = (idx) => {
    console.log(
      "editResume btn clicked :: idx :: ",
      idx,
      props?.resumes?.[idx]
    );
    setActiveSection("general");
    setResumeEditData(props?.resumes?.[idx]);
    setShowAddResume(true);
  };

  const downloadResume = (idx) => {
    setResumeEditData(props?.resumes?.[idx]);

    const blob = new Blob([JSON.stringify(resumeEditData)], {
      type: "text/json",
    });
    const link = document.createElement("a");

    link.download = resumeEditData?.general?.resumeName + ".json";
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ["text/json", link.download, link.href].join(
      ":"
    );

    const evt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove();
  };

  const uploadResumme = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    
    reader.readAsText(e.target.files[0]);

    reader.onload = (e) => {
      const text = e.target.result;
      console.log(text);
      ResumeService.uploadResume(JSON.parse(text));
      props.fetchResumes();
    };

    reader.onerror = function () {
      console.log(e.target.error);
    };
  };

  const changeTemplate = (idx) => {
    setResumeEditData(props?.resumes?.[idx]);
    setActiveSection("templates");
    setShowAddResume(true);
  };
  return (
    <>
      <div style={styles.addResume}>
        {showAddResume && (
          <AddResume
            activeSection={activeSection}
            resumeEditData={resumeEditData}
            closeForm={closeForm}
          />
        )}
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

        <input
          class="pr mr5"
          id="File1"
          type="file"
          onChange={(e) => {
            uploadResumme(e);
          }}
        />
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
                        changeTemplate(i);
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
