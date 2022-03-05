import React, { useState, useEffect } from "react";
import "./resumeTemp.css";
import {
  Alert,
  Dialog,
  Slide,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Slider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Tooltip,
} from "@mui/material";

import {
  Add,
  Delete,
  CheckCircle,
  RadioButtonUnchecked,
  RadioButtonChecked,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { ResumePreview } from "./ResumePreview";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const ResumeTemplate = ({
  addResumeForm,
  resumeFormFields,
  onAdd,
  onDlt,
  resumeEditData
}) => {
  const handleClose = () => {
    setShowPreview(false);
  };

  const _resumeTemplates = [
    // {
    //   id: 0,
    //   name: "Professional",
    //   image: "resume_temp_1.jpeg",
    // },
    {
      id: 1,
      name: "Modern",
      image: "resume_temp_2.jpeg",
    },
  ];

  const [showPreview, setShowPreview] = useState(false);

  const selectResumeTemp = (idx) => {
    console.log("selectResumeTemp :: idx ::", idx);
    console.log(
      "selectResumeTemp :: _resumeTemplates[idx] ::",
      _resumeTemplates[idx]
    );
    setTempleteInResumeObj(_resumeTemplates[idx]);
  };

  const onPreviewBtnClick = () => {
    setShowPreview(true);
  };

  const setTempleteInResumeObj = (selectedResumeTemp) => {
    console.log(
      "setTempleteInResumeObj :: selectedResumeTemp ::",
      selectedResumeTemp
    );
    let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
    copyResumeFormFields["template"] = selectedResumeTemp;
    addResumeForm.setState(copyResumeFormFields);
    console.log("resumeFormFields.template ::", resumeFormFields.template);
  };

  useEffect((e) => {
    if (resumeFormFields?.template?.id) return;
    resumeEditData?.template?.id ? setTempleteInResumeObj(resumeEditData?.template) : setTempleteInResumeObj(_resumeTemplates[0]);
  }, []);

  return (
    <>
      <h2 className="title2">Templates</h2>
      <Card>
        <CardContent className="p-rel">
          <Grid className="contRowMargin" container spacing={2}>
            {_resumeTemplates?.map((rt, i) => {
              return (
                <Grid
                  key={"rt" + i}
                  onClick={() => {
                    selectResumeTemp(i);
                  }}
                  className={
                    "resume-temp-grid " +
                    (rt.id === resumeFormFields.template?.id && "active")
                  }
                  item
                  xs={2}
                  md={2}
                  sx={2}
                >
                  <img
                    className="temp-img"
                    src={"images/" + rt.image}
                    alt={rt.name}
                    loading="lazy"
                  />

                  <div className="resume-temp-check-icon">
                    {rt.id === resumeFormFields.template?.id ? (
                      <RadioButtonChecked color="primary"/>
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                  </div>

                  <div className={"bold resume-temp-title " + (rt.id === resumeFormFields.template?.id && "selected")}>{rt.name}</div>
                </Grid>
              );
            })}
          </Grid>

          <Button
            className="pr previewBtn"
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => {
              onPreviewBtnClick();
            }}
          >
            PREVIEW
          </Button>
        </CardContent>
      </Card>

      <Dialog
        fullScreen
        open={showPreview}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="closeBtn"
        >
          <CloseIcon />
        </IconButton>
        <ResumePreview selectedResumeTemp={resumeFormFields.template} addResumeForm={addResumeForm}/>
      </Dialog>
    </>
  );
};
