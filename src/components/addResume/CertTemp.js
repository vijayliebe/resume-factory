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

export const CertTemp = ({ addResumeForm, resumeFormFields, onAdd, onDlt, resumeEditData }) => {

  return (
    <div>
      <h2 className="title2">
        Certification or License

        {!resumeFormFields?.certificates?.length && (
                    <Tooltip
                      title="Add New Certificate or Licence"
                      placement="bottom"
                    >
                      <IconButton
                        onClick={() => {
                          onAdd(["certificates"], FormFieldService.getFields("certificates"));
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
        
        </h2>

      {resumeFormFields?.certificates?.map((cert, i) => {
        const projDiv = (
          <Card key={"cert_" + i} className="card-container">
            <CardContent>
              <div className="snodiv">{"#CERTIFICATE or LICENCE : " + (i + 1)}</div>
              <Grid className="" container spacing={2}>
                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"name_" + (i + 1)}
                    label={"Name "}
                    type="text"
                    value={cert.name.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "name",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "name",
                      ]);
                    }}
                    error={cert.name.errors.length == 0 ? false : true}
                    helperText={cert.name.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"startDate_" + (i + 1)}
                    label={"Start Date "}
                    type="date"
                    sx={{ width: "100%" }}
                    value={cert.startDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "startDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "startDate",
                      ]);
                    }}
                    error={cert.startDate.errors.length == 0 ? false : true}
                    helperText={cert.startDate.errors.join("\n")}
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
                    value={cert.endDate.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "endDate",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "endDate",
                      ]);
                    }}
                    error={cert.endDate.errors.length == 0 ? false : true}
                    helperText={cert.endDate.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3} md={3} sx={3}>
                  <TextField
                    id={"org_" + (i + 1)}
                    label={"Issuing Organisation "}
                    type="text"
                    value={cert.org.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "org",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "org",
                      ]);
                    }}
                    error={cert.org.errors.length == 0 ? false : true}
                    helperText={cert.org.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"cid_" + (i + 1)}
                    label={"Credential Id"}
                    type="text"
                    value={cert.cid.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "cid",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "cid",
                      ]);
                    }}
                    error={cert.cid.errors.length == 0 ? false : true}
                    helperText={cert.cid.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={"url_" + (i + 1)}
                    label={"Credential Url"}
                    type="text"
                    value={cert.url.value}
                    onChange={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "url",
                      ]);
                    }}
                    onBlur={(e) => {
                      addResumeForm.onFormFieldChange(e, [
                        "certificates",
                        i,
                        "url",
                      ]);
                    }}
                    error={cert.url.errors.length == 0 ? false : true}
                    helperText={cert.url.errors.join("\n")}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={1} md={1} sx={1}>
                  {i === resumeFormFields.certificates.length - 1 && (
                    <Tooltip
                      title="Add New Certificate or Licence"
                      placement="bottom"
                    >
                      <IconButton
                        onClick={() => {
                          onAdd(["certificates"], FormFieldService.getFields("certificates"));
                        }}
                      >
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {/* {resumeFormFields?.certificates?.length > FormFieldService.getFieldsMinCount("certificates") && ( */}
                    <Tooltip
                      title="Delete Certificate or Licence"
                      placement="bottom"
                    >
                      <IconButton
                        onClick={() => {
                          onDlt(["certificates"], i);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  {/* )} */}
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
