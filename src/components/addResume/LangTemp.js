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

export const LangTemp = ({
  addResumeForm,
  resumeFormFields,
  setResumeFormFields,
  onAdd,
  onDlt,
}) => {
  const minLangs = 2;
  const langFields = {
    lang: new Array(minLangs).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
    ),
    ratings: new Array(minLangs).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
    ),
  };

  useEffect((e) => {
    let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
    copyResumeFormFields["languages"] = langFields;
    addResumeForm.setState(copyResumeFormFields);
  }, []);

  return (
    <div>
      <h2>Languages</h2>
      <Card>
        <CardContent>
          {resumeFormFields?.languages?.lang?.map((ts, i) => {
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
                      addResumeForm.onFormFieldChange(e, [
                        "languages",
                        "lang",
                        i,
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "languages",
                        "lang",
                        i,
                      ]);
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
                        addResumeForm.onFormFieldChange(e, [
                          "languages",
                          "ratings",
                          i,
                        ]);
                      }}
                      min={1}
                      max={10}
                    />
                  </div>
                </Grid>
                <Grid item xs={2} md={2} sx={2}>
                  <div className="addDltBtn">
                    {i === resumeFormFields.languages.lang.length - 1 && (
                      <Tooltip title="Add New Language" placement="bottom">
                        <IconButton
                          onClick={() => {
                            onAdd(["languages"]);
                          }}
                        >
                          <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {i >= minLangs && (
                      <Tooltip title="Delete Language" placement="bottom">
                        <IconButton
                          onClick={() => {
                            onDlt(["languages"], i);
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
