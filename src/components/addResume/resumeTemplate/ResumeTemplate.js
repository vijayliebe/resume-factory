import React, { useState } from "react";
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

import { Add, Delete, CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { ResumePreview } from "./ResumePreview";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export const ResumeTemplate = (props) => {
  const handleClose = () => {
    setShowPreview(false);
  };

  const _resumeTemplates = [
    {
      name: "Professional",
      image: "resume_temp_1.jpeg",
      active: true,
    },
    {
      name: "Modern",
      image: "resume_temp_2.jpeg",
      active: false,
    },
  ];

  const [resumeTemplates, setResumeTemplates] = useState(_resumeTemplates);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedResumeTemp, setSelectedResumeTemp] = useState(
    resumeTemplates.filter((rt) => {
      return rt.active == true;
    })[0]
  );

  const selectResumeTemp = (idx) => {
    setSelectedResumeTemp(resumeTemplates[idx]);
    let copy = resumeTemplates.map((rt, i) => {
      rt.active = i == idx ? true : false;
      return rt;
    });
    setResumeTemplates(copy);
  };

  const onPreviewBtnClick = () => {
    setShowPreview(true);
  };

  return (
    <>
      <h2 className="title2">Templates</h2>
      <Card>
        <CardContent className="p-rel">
          <Grid className="contRowMargin" container spacing={2}>
            {resumeTemplates.map((rt, i) => {
              return (
                <Grid
                  key={"rt" + i}
                  onClick={() => {
                    selectResumeTemp(i);
                  }}
                  className={"resume-temp-grid " + (rt.active && "active")}
                  item
                  xs={2}
                  md={2}
                  sx={2}
                >
                  <img
                    className=""
                    src={"images/" + rt.image}
                    alt={rt.name}
                    loading="lazy"
                  />
                  {rt.active && (
                    <div className="resume-temp-check-icon">
                      <CheckCircle />
                    </div>
                  )}
                  <div className="bold resume-temp-title">{rt.name}</div>
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
        <ResumePreview selectedResumeTemp={selectedResumeTemp} />
      </Dialog>
    </>
  );
};
