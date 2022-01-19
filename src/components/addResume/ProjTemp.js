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
  Checkbox
} from "@mui/material";
import { Add, Delete, CheckCircle } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { FormFieldService } from "../../services/FormFieldsService";

export const ProjTemp = ({ addResumeForm, resumeFormFields, onAdd, onDlt, resumeEditData }) => {
  
  return (
    <div>
      <h2 className="title2">Projects</h2>

      {resumeFormFields?.projects?.map((p, i) => {
        const projDiv = (
          <Card key={"proj_" + i} className="card-container">
            <CardContent>
              <div className="snodiv">{"#PROJECT : " + (i + 1)}</div>
              <div>
                              <Checkbox className="checkBox-pad"
                                {... { inputProps: { 'aria-label': 'Checkbox demo' } }}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                checked={p.current.value}
                                onChange={(e)=>{
                                  addResumeForm.onFormFieldChange(e, [
                                    "projects",
                                    i,
                                    "current",
                                  ]);
                                  setTimeout(() => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "projects",
                                      i,
                                      "endDate",
                                    ], e.target.checked);
                                  });
                                  
                                }}
                              />
                              <span>Presently Working</span>
                            </div>
              <Grid className="" container spacing={2}>
                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"name_" + (i + 1)}
                    label={"Name "}
                    type="text"
                    value={p.name.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "name",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "name",
                      ]);
                    }}
                    error={p.name.errors.length == 0 ? false : true}
                    helperText={p.name.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"url_" + (i + 1)}
                    label={"Project Url "}
                    type="text"
                    value={p.url.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "url",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "url",
                      ]);
                    }}
                    error={p.url.errors.length == 0 ? false : true}
                    helperText={p.url.errors.join("\n")}
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
                    value={p.startDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "startDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "startDate",
                      ]);
                    }}
                    error={p.startDate.errors.length == 0 ? false : true}
                    helperText={p.startDate.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"endDate_" + (i + 1)}
                    label={"End Date "}
                    type="date"
                    sx={{ width: "100%" }}
                    disabled={p.endDate.disabled}
                    value={p.endDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "endDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "endDate",
                      ]);
                    }}
                    error={p.endDate.errors.length == 0 ? false : true}
                    helperText={p.endDate.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} md={6} sx={6}>
                  <TextField
                    id={"proj_comp_" + (i + 1)}
                    label={"Project's Commpany "}
                    type="text"
                    value={p.company.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "company",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "company",
                      ]);
                    }}
                    error={p.company.errors.length == 0 ? false : true}
                    helperText={p.company.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={6} md={6} sx={6}>
                  <TextField
                    id={"tech_" + (i + 1)}
                    label={"Technologies Used"}
                    placeholder="HTML, CSS, Javascript"
                    type="text"
                    value={p.tech.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "tech",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "tech",
                      ]);
                    }}
                    error={p.tech.errors.length == 0 ? false : true}
                    helperText={p.tech.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={12} sx={12}>
                  <TextField
                    id={"desc_" + (i + 1)}
                    label={"Description "}
                    multiline
                    rows={3}
                    type="text"
                    value={p.desc.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "desc",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "desc",
                      ]);
                    }}
                    error={p.desc.errors.length == 0 ? false : true}
                    helperText={p.desc.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={11} md={11} sx={11}>
                  <TextField
                    id={"roles_" + (i + 1)}
                    label={"Roles & Responsibilities"}
                    type="text"
                    multiline
                    rows={3}
                    placeholder="a. Requirement Gathering &#13;&#10;b. Front-end Development &#13;&#10;c. API development"
                    value={p.roles.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "roles",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "projects",
                        i,
                        "roles",
                      ]);
                    }}
                    error={p.roles.errors.length == 0 ? false : true}
                    helperText={p.roles.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={1} md={1} sx={1}>
                  {i === resumeFormFields.projects.length - 1 && (
                    <Tooltip title="Add New Project" placement="bottom">
                      <IconButton
                        onClick={() => {
                          onAdd(["projects"], FormFieldService.getFields("projects"));
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {resumeFormFields?.projects?.length > FormFieldService.getFieldsMinCount("projects") && (
                    <Tooltip title="Delete Project" placement="bottom">
                      <IconButton
                        onClick={() => {
                          onDlt(["projects"], i);
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
