import React, { useState, useEffect } from "react";
import "./addResume.css";
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
  Checkbox,
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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { ResumeService } from "../../services/ResumeService";
import { ResumeTemplate } from "./resumeTemplate/ResumeTemplate";
import { FormService } from "../../services/FormService";
import { EduTemp } from "./EduTemp";
import { ProjTemp } from "./ProjTemp";
import { LangTemp } from "./LangTemp";
import { CertTemp } from "./CertTemp";
import { FormFieldService } from "../../services/FormFieldsService";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddResume = (props) => {
  const addResumeCont = {
    main: {
      background: "#fff",
      boxSizing: "border-box",
      padding: "1em",
    },
    sectionsCont: {
      background: "#eee",
      marginTop: "9px",
      paddingLeft: "0",
      boxShadow: "0 0 15px rgba(0,0,0,0.75)",
      clipPath: "inset(0px -15px 0px 0px)",
    },
    sectionsRCont: {
      padding: "0",
    },
    sectionsContLiUl: {
      listStyleType: "none",
      paddingLeft: "0",
    },
    sectionsContLi: {
      borderBottom: "1px solid #ccc",
      padding: "20px 30px",
      fontSize: "1.2em",
      textTransform: "uppercase",
      cursor: "pointer",
    },
    form: {
      background: "#eee",
      marginTop: "20px",
      height: "calc(100vh - 200px)",
      overflowY: "scroll",
      marginTop: "8px",
      boxSizing: "border-box",
      padding: "1em",
    },
    addDltBtn: {
      paddingTop: "16px",
    },
    skillRowMargin: {
      marginBottom: "20px",
    },
    expRowMargin: {
      paddingBottom: "2.5em",
      paddingTop: "2.5em",
      marginBottom: "1.3em",
      boxShadow: "0 0 10px rgba(0,0,0,0.75)",
      clipPath: "inset(0px 0px -10px 0px)",
    },
    submitBtn: {
      marginTop: "1.6%",
      marginRight: "1%",
      float: "right",
    },
  };

  const tabList = {
    general: "General",
    educations: "Education",
    experiences: "Experiences",
    projects: "Projects",
    technicalSkills: "Technical Skills",
    professionalSkills: "Professional Skills",
    languages: "Languages",
    certificates: "Certifications & Rewards",
    templates: "Templates",
  };
  const tabs = Object.keys(tabList);
  const [activeSection, setActiveSection] = useState(props.activeSection || "general");

  /* form operations - start */
  const addResumeForm = FormService;

  const resumeFormFieldsObj = {
    general: FormFieldService.getFieldList("general"),
    technicalSkills: FormFieldService.getFieldList("technicalSkills", props?.resumeEditData),
    professionalSkills: FormFieldService.getFieldList("professionalSkills", props?.resumeEditData),
    experiences: FormFieldService.getFieldList("experiences", props?.resumeEditData?.experiences?.length),
    educations: FormFieldService.getFieldList("educations", props?.resumeEditData?.educations?.length),
    projects: FormFieldService.getFieldList("projects", props?.resumeEditData?.projects?.length),
    certificates: FormFieldService.getFieldList("certificates", props?.resumeEditData?.certificates?.length),
    languages: FormFieldService.getFieldList("languages", props?.resumeEditData),
    template: {},
  };

  const [resumeFormFields, setResumeFormFields] = useState(resumeFormFieldsObj);
  addResumeForm.init(resumeFormFields, setResumeFormFields);

  /* form operations - end */

  useEffect(() => {
    console.log(
      "resumeFormFields :: useEffect :: resumeEditData ::",
      props.resumeEditData
    );
    console.log(
      "resumeFormFields :: useEffect :: resumeFormFields ::",
      resumeFormFields
    );

    if (props.resumeEditData) {
      addResumeForm.setValue(props.resumeEditData);
    }
  }, []);


  const onAdd = (formNames, fieldsmapObj) => {
    let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
    let tsList = copyResumeFormFields;
    for (let fn of formNames) {
      tsList = tsList[fn];
    }

    if (
      formNames.includes("technicalSkills") ||
      formNames.includes("professionalSkills")
    ) {
      tsList.skills.push(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
      );
      tsList.ratings.push(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
      );
    } else if (formNames.includes("languages")) {
      tsList.lang.push(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
      );
      tsList.ratings.push(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
      );
    } else {
      tsList.push(fieldsmapObj);
    }

    setResumeFormFields(copyResumeFormFields);
  };

  const onDlt = (formNames, index) => {
    let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
    let tsList = copyResumeFormFields;
    for (let fn of formNames) {
      tsList = tsList[fn];
    }

    if (
      formNames.includes("technicalSkills") ||
      formNames.includes("professionalSkills")
    ) {
      tsList.skills.splice(index, 1);
      tsList.ratings.splice(index, 1);
    } else if (formNames.includes("languages")) {
      tsList.lang.splice(index, 1);
      tsList.ratings.splice(index, 1);
    } else {
      tsList.splice(index, 1);
    }

    setResumeFormFields(copyResumeFormFields);
  };

  const onFormSubmit = (id) => {
    console.log(
      "onFormSubmit :: resumeFormFields :: id :: ",
      resumeFormFields,
      id
    );
    const payload = addResumeForm.getValue();

    if (id) {
      ResumeService.editResume(id, payload);
      props.closeForm();
    } else {
      if (activeSection === tabs[tabs.length - 1]) {
        // save
        const errorTab = [];
        const tabErrors = JSON.parse(JSON.stringify(tabList));
        for (let tab in tabErrors) {
          const error = !addResumeForm.isFormValid(tab);
          if (error) {
            errorTab.push(tab);
            tabErrors[tab] = error;
            break;
          }
        }

        console.log("onFormSubmit :: errorTab ::", errorTab);

        if (errorTab.length) {
          setActiveSection(errorTab[0]);
        } else {
          console.log("onFormSubmit :: payload ::", payload);
          ResumeService.saveResume(payload);
          props.closeForm();
        }
      } else {
        if (addResumeForm.isFormValid(activeSection)) {
          setActiveSection(tabs[tabs.indexOf(activeSection) + 1]);
        }
      }
    }
  };

  return (
    <Dialog
      fullScreen
      open={true}
      onClose={props.closeForm}
      TransitionComponent={Transition}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={props.closeForm}
        aria-label="close"
        className="closeBtn"
      >
        <CloseIcon />
      </IconButton>
      <div style={addResumeCont.main}>
        <h1 className="title1">
          {props.resumeEditData ? "Edit" : "Add"} Resume{" "}
        </h1>
        {/* <h3 className="title2"> {props.resumeEditData ?  props.resumeEditData?.general?.resumeName : ''}</h3> */}
        <hr></hr>

        <Grid container spacing={2}>
          <Grid style={addResumeCont.sectionsCont} item xs={2} md={2} sx={2}>
            <ul style={addResumeCont.sectionsContLiUl}>
              {Object.keys(tabList).map((tab, i) => {
                const tabHtml = (
                  <li
                    key={tab + i}
                    style={addResumeCont.sectionsContLi}
                    className={
                      "section " + (activeSection === tab && "activeSection")
                    }
                    onClick={() => {
                      setActiveSection(tab);
                    }}
                  >
                    {tabList[tab]}
                  </li>
                );
                return tabHtml;
              })}
            </ul>
          </Grid>

          <Grid
            style={addResumeCont.sectionsRCont}
            item
            xs={10}
            md={10}
            sx={10}
          >
            <form style={addResumeCont.form}>
              {(activeSection === "intro" || activeSection === "general") && (
                <>
                  <h2 className="title2">Resume Name</h2>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={6}>
                          <TextField
                            id="resumeName"
                            label="Resume Name"
                            variant="outlined"
                            value={resumeFormFields.general.resumeName.value}
                            placeholder="eg. Resume-India"
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "resumeName",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "resumeName",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.resumeName.errors
                                .length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.resumeName.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  <h2 className="title2">Introduction</h2>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={6}>
                          {/* <input className="formGroup" type="text" id="name" placeholder="Name" />     */}
                          <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            value={resumeFormFields.general.name.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "name",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "name",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.name.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.name.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} md={6} sx={6}>
                          <TextField
                            id="title"
                            label="Title"
                            placeholder="eg. Full Stack Developer @AB"
                            variant="outlined"
                            value={resumeFormFields.general.title.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "title",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "title",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.title.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.title.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            id="about"
                            label="About Yourself..."
                            multiline
                            rows={2}
                            value={resumeFormFields.general.about.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "about",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "about",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.about.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.about.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} md={12} sx={12}>
                          <TextField
                            id="image"
                            label="Image Url"
                            placeholder="Provide Image url"
                            variant="outlined"
                            value={resumeFormFields.general.image.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "image",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "image",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.image.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.image.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </>
              )}

              {(activeSection === "cd" || activeSection === "general") && (
                <>
                  <h2 className="title2">Contact Details</h2>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={6}>
                          <TextField
                            id="phone"
                            label="Phone"
                            placeholder="1234567890, 0987654321"
                            type="text"
                            variant="outlined"
                            value={resumeFormFields.general.phone.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "phone",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "phone",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.phone.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.phone.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TextField
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={resumeFormFields.general.email.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "email",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "email",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.email.errors.length == 0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.email.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TextField
                            id="linkedIn"
                            label="LinkedIn Url"
                            type="text"
                            variant="outlined"
                            value={resumeFormFields.general.linkedIn.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "linkedIn",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "linkedIn",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.linkedIn.errors.length ==
                              0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.linkedIn.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={6} md={6}>
                          <TextField
                            id="location"
                            label="Present location eg. Bangalore"
                            type="text"
                            variant="outlined"
                            value={resumeFormFields.general.location.value}
                            onChange={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "location",
                              ]);
                            }}
                            onBlur={(e) => {
                              addResumeForm.onFormFieldChange(e, [
                                "general",
                                "location",
                              ]);
                            }}
                            error={
                              resumeFormFields.general.location.errors.length ==
                              0
                                ? false
                                : true
                            }
                            helperText={resumeFormFields.general.location.errors.join(
                              "\n"
                            )}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </>
              )}

              {activeSection === "technicalSkills" && (
                <>
                  {/* Technical skills - start */}
                  <h2 className="title2">Technical Skills</h2>
                  <Card>
                    <CardContent>
                      {resumeFormFields?.technicalSkills?.skills?.map((ts, i) => {
                        const tsr = resumeFormFields.technicalSkills.ratings[i];
                        const tsdiv = (
                          <Grid
                            key={"row_" + i}
                            style={addResumeCont.skillRowMargin}
                            container
                            spacing={2}
                          >
                            <Grid item xs={5} md={5} sx={5}>
                              <TextField
                                id={"name_" + (i + 1)}
                                label={"Skill Name " + (i + 1)}
                                type="text"
                                value={ts.value}
                                onChange={(e) => {
                                  addResumeForm.onFormFieldChange(e, [
                                    "technicalSkills",
                                    "skills",
                                    i,
                                  ]);
                                }}
                                onBlur={(e) => {
                                  addResumeForm.onFormFieldChange(e, [
                                    "technicalSkills",
                                    "skills",
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
                                      "technicalSkills",
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
                              <div style={addResumeCont.addDltBtn}>
                                {i ===
                                  resumeFormFields.technicalSkills.skills
                                    .length -
                                    1 && (
                                  <Tooltip
                                    title="Add New Skill"
                                    placement="bottom"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        onAdd(["technicalSkills"]);
                                      }}
                                    >
                                      <AddCircleOutlineOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {resumeFormFields.technicalSkills.skills
                                  .length > FormFieldService.getFieldsMinCount("technicalSkills") && (
                                  <Tooltip
                                    title="Delete Skill"
                                    placement="bottom"
                                  >
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
                  {/* Technical skills - end */}
                </>
              )}

              {activeSection === "professionalSkills" && (
                <>
                  {/* Professional skills - start */}
                  <h2 className="title2">Professional Skills</h2>
                  <Card>
                    <CardContent>
                      {resumeFormFields.professionalSkills.skills.map(
                        (ps, i) => {
                          const psr =
                            resumeFormFields.professionalSkills.ratings[i];
                          const psdiv = (
                            <Grid
                              key={"row_" + i}
                              style={addResumeCont.skillRowMargin}
                              container
                              spacing={2}
                            >
                              <Grid item xs={5} md={5} sx={5}>
                                <TextField
                                  id={"name_" + (i + 1)}
                                  label={"Skill Name " + (i + 1)}
                                  type="text"
                                  value={ps.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "professionalSkills",
                                      "skills",
                                      i,
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "professionalSkills",
                                      "skills",
                                      i,
                                    ]);
                                  }}
                                  error={ps.errors.length == 0 ? false : true}
                                  helperText={ps.errors.join("\n")}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={5} md={5} sx={5}>
                                <div className="customInputBorder">
                                  <div className="customInputBorderLabel">
                                    Rating({psr.value})
                                  </div>
                                  <Slider
                                    aria-label="Rating"
                                    defaultValue={1}
                                    valueLabelDisplay="auto"
                                    marks
                                    value={psr.value}
                                    onChange={(e) => {
                                      addResumeForm.onFormFieldChange(e, [
                                        "professionalSkills",
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
                                <div style={addResumeCont.addDltBtn}>
                                  {i ===
                                    resumeFormFields.professionalSkills.skills
                                      .length -
                                      1 && (
                                    <Tooltip
                                      title="Add New Skill"
                                      placement="bottom"
                                    >
                                      <IconButton
                                        onClick={() => {
                                          onAdd(["professionalSkills"]);
                                        }}
                                      >
                                        <AddCircleOutlineOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                  {resumeFormFields.professionalSkills.skills
                                    .length > FormFieldService.getFieldsMinCount("professionalSkills") && (
                                    <Tooltip
                                      title="Delete Skill"
                                      placement="bottom"
                                    >
                                      <IconButton
                                        onClick={() => {
                                          onDlt(["professionalSkills"], i);
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
                          return psdiv;
                        }
                      )}
                    </CardContent>
                  </Card>
                  {/* Professional skills - end */}
                </>
              )}

              {activeSection === "experiences" && (
                <>
                  <h2 className="title2">Experience </h2>

                  {resumeFormFields.experiences.map((experience, i) => {
                    const expDiv = (
                      <Card key={"exp_" + i} className="card-container">
                        <CardContent>
                          <div>
                            <div className="snodiv">
                              {"#EXPERIENCE : " + (i + 1)}
                            </div>
                            <div>
                              <Checkbox
                                className="checkBox-pad"
                                {...{
                                  inputProps: { "aria-label": "Checkbox demo" },
                                }}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                checked={experience.current.value}
                                onChange={(e) => {
                                  addResumeForm.onFormFieldChange(e, [
                                    "experiences",
                                    i,
                                    "current",
                                  ]);
                                  setTimeout(() => {
                                    addResumeForm.onFormFieldChange(
                                      e,
                                      ["experiences", i, "endDate"],
                                      e.target.checked
                                    );
                                  });
                                }}
                              />
                              <span>Presently Working</span>
                            </div>
                            <Grid container spacing={2}>
                              <Grid item xs={4} md={4} sx={4}>
                                <TextField
                                  id={"title" + (i + 1)}
                                  label="Title"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  value={experience.title.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "title",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "title",
                                    ]);
                                  }}
                                  error={
                                    experience.title.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.title.errors.join(
                                    "\n"
                                  )}
                                />
                              </Grid>

                              <Grid item xs={4} md={4} sx={4}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Employment Type
                                  </InputLabel>
                                  <Select
                                    labelId={"employmentType_" + (i + 1)}
                                    id={"employmentType_" + (i + 1)}
                                    value={experience.employmentType.value}
                                    label="Employment Type"
                                    onChange={(e) => {
                                      addResumeForm.onFormFieldChange(e, [
                                        "experiences",
                                        i,
                                        "employmentType",
                                      ]);
                                    }}
                                  >
                                    <MenuItem value="fullTime">
                                      Full-time
                                    </MenuItem>
                                    <MenuItem value="partTime">
                                      Part-time
                                    </MenuItem>
                                    <MenuItem value="selfEmployed">
                                      Self-employed
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>

                              <Grid item xs={4} md={4} sx={4}>
                                <TextField
                                  id={"company" + (i + 1)}
                                  label="Company"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  value={experience.company.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "company",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "company",
                                    ]);
                                  }}
                                  error={
                                    experience.company.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.company.errors.join(
                                    "\n"
                                  )}
                                />
                              </Grid>

                              <Grid item xs={4} md={4} sx={4}>
                                <TextField
                                  id={"location" + (i + 1)}
                                  label="Location"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  value={experience.location.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "location",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "location",
                                    ]);
                                  }}
                                  error={
                                    experience.location.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.location.errors.join(
                                    "\n"
                                  )}
                                />
                              </Grid>

                              <Grid item xs={4} md={4}>
                                <TextField
                                  id={"startDate" + (i + 1)}
                                  label="Start Date"
                                  type="date"
                                  sx={{ width: "100%" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={experience.startDate.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "startDate",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "startDate",
                                    ]);
                                  }}
                                  error={
                                    experience.startDate.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.startDate.errors.join(
                                    "\n"
                                  )}
                                />
                              </Grid>

                              <Grid item xs={4} md={4}>
                                <TextField
                                  id={"ed" + (i + 1)}
                                  label="End Date"
                                  type="date"
                                  sx={{ width: "100%" }}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  disabled={experience.endDate.disabled}
                                  value={experience.endDate.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "endDate",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "endDate",
                                    ]);
                                  }}
                                  error={
                                    experience.endDate.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.endDate.errors.join(
                                    "\n"
                                  )}
                                />

                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                      label="Start Date"
                                      type="date"
                                      renderInput={(params) => <TextField {...params} />}
                                    />
                                  </LocalizationProvider>
                                */}
                              </Grid>

                              <Grid item xs={11} md={11} sx={11}>
                                <TextField
                                  id={"roles_" + (i + 1)}
                                  label={"Roles & Responsibilities"}
                                  type="text"
                                  multiline
                                  rows={3}
                                  placeholder="a. Requirement Gathering &#13;&#10;b. Front-end Development &#13;&#10;c. API development"
                                  value={experience.roles.value}
                                  onChange={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "roles",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    addResumeForm.onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "roles",
                                    ]);
                                  }}
                                  error={
                                    experience.roles.errors.length == 0
                                      ? false
                                      : true
                                  }
                                  helperText={experience.roles.errors.join(
                                    "\n"
                                  )}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={1} md={1} sx={1}>
                                {i ===
                                  resumeFormFields.experiences.length - 1 && (
                                  <Tooltip
                                    title="Add New Skill"
                                    placement="bottom"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        onAdd(
                                          ["experiences"],
                                          FormFieldService.getFields("experiences")
                                        );
                                      }}
                                    >
                                      <AddCircleOutlineOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {resumeFormFields.experiences.length >
                                  FormFieldService.getFieldsMinCount("experiences") && (
                                  <Tooltip
                                    title="Delete Skill"
                                    placement="bottom"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        onDlt(["experiences"], i);
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </Grid>
                            </Grid>
                          </div>
                        </CardContent>
                      </Card>
                    );
                    return expDiv;
                  })}
                </>
              )}

              {activeSection === "templates" && (
                <ResumeTemplate
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                  resumeEditData={props.resumeEditData}
                />
              )}
              {activeSection === "educations" && (
                <EduTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                  resumeEditData={props.resumeEditData}
                />
              )}
              {activeSection === "projects" && (
                <ProjTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                  resumeEditData={props.resumeEditData}
                />
              )}
              {activeSection === "languages" && (
                <LangTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                  resumeEditData={props.resumeEditData}
                />
              )}
              {activeSection === "certificates" && (
                <CertTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                  resumeEditData={props.resumeEditData}
                />
              )}
            </form>
          </Grid>
        </Grid>
        {activeSection !== tabs[tabs.length - 1] && ( 
        <Button
          className="pr"
          style={addResumeCont.submitBtn}
          size="large"
          variant="contained"
          color="primary"
          onClick={() => {
            onFormSubmit();
          }}
        >
          NEXT
        </Button>
        )}
        {(props?.resumeEditData?.id || activeSection == tabs[tabs.length - 1]) && (
          <Button
            className="pr"
            style={addResumeCont.submitBtn}
            size="large"
            variant="contained"
            color="success"
            onClick={() => {
              onFormSubmit(props?.resumeEditData?.id);
            }}
          >
            SAVE
          </Button>
         )}
      </div>
    </Dialog>
  );
};
