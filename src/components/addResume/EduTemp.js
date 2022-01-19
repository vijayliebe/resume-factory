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
import { FormFieldService } from "../../services/FormFieldsService";

export const EduTemp = ({ addResumeForm, resumeFormFields, onAdd, onDlt, resumeEditData }) => {
  
  return (
    <div>
      <h2 className="title2">Educations</h2>

      {resumeFormFields?.educations?.map((edu, i) => {
        const projDiv = (
          <Card key={"edu_" + i} className="card-container">
            <CardContent>
              <div className="snodiv">{"#EDUCATION : " + (i + 1)}</div>
              <Grid className="" container spacing={2}>
                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"school_" + (i + 1)}
                    label={"School "}
                    type="text"
                    value={edu.school.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "school",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "school",
                      ]);
                    }}
                    error={edu.school.errors.length == 0 ? false : true}
                    helperText={edu.school.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"degree_" + (i + 1)}
                    label={"Degree "}
                    type="text"
                    value={edu.degree.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "degree",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "degree",
                      ]);
                    }}
                    error={edu.degree.errors.length == 0 ? false : true}
                    helperText={edu.degree.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"field_" + (i + 1)}
                    label={"Field "}
                    placeholder="eg. Business"
                    type="text"
                    value={edu.field.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "field",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "field",
                      ]);
                    }}
                    error={edu.field.errors.length == 0 ? false : true}
                    helperText={edu.field.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"startDate_" + (i + 1)}
                    label={"Start Date "}
                    type="date"
                    sx={{ width: "100%" }}
                    value={edu.startDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "startDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "startDate",
                      ]);
                    }}
                    error={edu.startDate.errors.length == 0 ? false : true}
                    helperText={edu.startDate.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"endDate_" + (i + 1)}
                    label={"End Date "}
                    type="date"
                    sx={{ width: "100%" }}
                    value={edu.endDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "endDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "endDate",
                      ]);
                    }}
                    error={edu.endDate.errors.length == 0 ? false : true}
                    helperText={edu.endDate.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"grade_" + (i + 1)}
                    label={"Grade"}
                    type="text"
                    value={edu.grade.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "grade",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "educations",
                        i,
                        "grade",
                      ]);
                    }}
                    error={edu.grade.errors.length == 0 ? false : true}
                    helperText={edu.grade.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={1} md={1} sx={1}>
                  {i === resumeFormFields.educations.length - 1 && (
                    <Tooltip title="Add New Education" placement="bottom">
                      <IconButton
                        onClick={() => {
                          onAdd(["educations"], FormFieldService.getFields("educations"));
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {resumeFormFields?.educations?.length > FormFieldService.getFieldsMinCount("educations") && (
                    <Tooltip title="Delete Education" placement="bottom">
                      <IconButton
                        onClick={() => {
                          onDlt(["educations"], i);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        );
        return projDiv;
      })}
    </div>
  );
};
