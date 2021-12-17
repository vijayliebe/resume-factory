import React, { useState, useEffect } from "react";
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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const LangTemp = ({resumeFormFields, onFormFieldChange, onAdd, onDlt, minTechnicalSkills}) => {
  const minLanguages = 4;
  const languagesFields = {
    skills: new Array(minLanguages).fill(
      getGeneralFieldObj([validators.required])
    ),
    ratings: new Array(minLanguages).fill(
      getGeneralFieldObj([validators.required], 1)
    ),
  };

  useEffect(()=>{
  },[]);

  return (
    <div>
      <h2 className="title2">Languages</h2>
      <Card>
        <CardContent>
          {resumeFormFields.technicalSkills.skills.map((ts, i) => {
            const tsr = resumeFormFields.technicalSkills.ratings[i];
            const tsdiv = (
              <Grid
                key={"row_" + i}
                className="contRowMargin"
                container
                spacing={2}
              >
                <Grid item xs={5} md={5} sx={5}>
                  <TextField
                    id={"name_" + (i + 1)}
                    label={"Language Name " + (i + 1)}
                    type="text"
                    value={ts.value}
                    onChange={(e) => {
                      onFormFieldChange(e, ["technicalSkills", "skills", i]);
                    }}
                    onBlur={(e) => {
                      onFormFieldChange(e, ["technicalSkills", "skills", i]);
                    }}
                    error={ts.errors.length == 0 ? false : true}
                    helperText={ts.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={5} md={5} sx={5}>
                  <div className="customInputBorder">
                    <div className="customInputBorderLabel">
                      Rating({tsr.value})
                    </div>
                    <Slider
                      aria-label="Rating"
                      defaultValue={1}
                      valueLabelDisplay="auto"
                      marks
                      value={tsr.value}
                      onChange={(e) => {
                        onFormFieldChange(e, ["technicalSkills", "ratings", i]);
                      }}
                      min={1}
                      max={10}
                    />
                  </div>
                </Grid>
                <Grid item xs={2} md={2} sx={2}>
                  <div className="addDltBtn">
                    {i ===
                      resumeFormFields.technicalSkills.skills.length - 1 && (
                      <Tooltip title="Add New Skill" placement="bottom">
                        <IconButton
                          onClick={() => {
                            onAdd(["technicalSkills"]);
                          }}
                        >
                          <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {i >= minTechnicalSkills && (
                      <Tooltip title="Delete Skill" placement="bottom">
                        <IconButton
                          onClick={() => {
                            onDlt(["technicalSkills"], i);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                </Grid>
              </Grid>
            );
            return tsdiv;
          })}
        </CardContent>
      </Card>
    </div>
  );
};
