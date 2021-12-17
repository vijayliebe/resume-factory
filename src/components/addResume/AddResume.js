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
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export const AddResume = (props) => {
  const addResumeCont = {
    main: {
      background: "#fff",
      boxSizing: "border-box",
      padding: "1em"
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
    gen: "General",
    edu: "Education",
    exp: "Experiences",
    proj: "Projects",
    ts: "Technical Skills",
    ps: "Professional Skills",
    lang: "Languages",
    cert: "Certifications & Rewards",
    temp: "Templates",
  };
  const tabs = Object.keys(tabList);
  /* validation - start */
  const validateInput = (value, validators) => {
    let errors = [];

    validators.map((validator) => {
      let error;
      switch (validator.name) {
        case "required":
          error = ["", null, undefined].includes(value);
          break;

        case "url":
        case "email":
          const re = new RegExp(validator.pattern, "i");
          error = !["", null, undefined].includes(value) ? !re.test(value) : "";
          break;
      }
      if (error) errors.push(validator.errorMessage);
    });
    return errors;
  };

  const validators = {
    required: { name: "required", errorMessage: "Required" },
    email: {
      name: "email",
      pattern:
        '^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$',
      errorMessage: "Invalid email",
    },
    url: {
      name: "url",
      pattern:
        "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
      errorMessage: "Invalid Url",
    },
  };
  /* validation - end */

  /* form operations - start */
  const [activeSection, setActiveSection] = useState("gen");
  const minTechnicalSkills = 4;
  const minProfessionalSkills = 4;



  const date = new Date();
  const d = date.getDate(),
    m = date.getMonth() + 1,
    y = date.getFullYear();
  const dateString =
    "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);



  const generalFieldObj = {
    value: "",
    dirty: false,
    validators: [],
    errors: [],
  };
  const getGeneralFieldObj = (validators, value) => {
    let gfo = JSON.parse(JSON.stringify(generalFieldObj));
    gfo.value = value;
    gfo.validators = validators;
    return gfo;
  };

  const fieldsmap = {
    experiences: {
      title: getGeneralFieldObj([validators.required]),
      employmentType: getGeneralFieldObj([validators.required], "fullTime"),
      fullTime: getGeneralFieldObj([validators.required]),
      company: getGeneralFieldObj([validators.required]),
      location: getGeneralFieldObj([validators.required]),
      startDate: getGeneralFieldObj([validators.required], dateString),
      endDate: getGeneralFieldObj([validators.required], dateString),
    },
  };

  const generalFields = {
    name: getGeneralFieldObj([validators.required]),
    title: getGeneralFieldObj([validators.required]),
    about: getGeneralFieldObj([validators.required]),
    phone: getGeneralFieldObj([validators.required]),
    email: getGeneralFieldObj([validators.required, validators.email]),
    linkedIn: getGeneralFieldObj([validators.required, validators.url]),
    location: getGeneralFieldObj([validators.required]),
  };

  const technicalSkillFields = {
    skills: new Array(minTechnicalSkills).fill(
      getGeneralFieldObj([validators.required])
    ),
    ratings: new Array(minTechnicalSkills).fill(
      getGeneralFieldObj([validators.required], 1)
    ),
  };

  const professionalSkillFields = {
    skills: new Array(minProfessionalSkills).fill(
      getGeneralFieldObj([validators.required])
    ),
    ratings: new Array(minProfessionalSkills).fill(
      getGeneralFieldObj([validators.required], 1)
    ),
  };

  const experiencesFields = [fieldsmap.experiences];

  const resumeFormFieldsObj = {
    general: generalFields,
    technicalSkills: technicalSkillFields,
    professionalSkills: professionalSkillFields,
    experiences: experiencesFields,
    educations: {},
    projects: {},
    certificates: {},
  };

  const [resumeFormFields, setResumeFormFields] = useState(resumeFormFieldsObj);

  const onFormFieldChange = (e, formNames) => {
    const [inputValue] = [e.target.value];
    let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
    let formField = copyResumeFormFields;
    for (let fn of formNames) {
      formField = formField[fn];
    }

    const errors = validateInput(inputValue, formField.validators);

    formField.value = inputValue;
    "dirty" in formField ? (formField.dirty = true) : delete formField.dirty;
    formField.errors = errors;

    // console.log("onGeneralFieldChange :: formField ::", formField);
    // console.log("onGeneralFieldChange :: copyResumeFormFields ::", copyResumeFormFields);

    setResumeFormFields(copyResumeFormFields);
  };

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
      tsList.skills.push(getGeneralFieldObj([validators.required]));
      tsList.ratings.push(getGeneralFieldObj([validators.required], 1));
    } else {
      tsList.push(fieldsmap[fieldsmapObj]);
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
    } else {
      tsList.splice(index, 1);
    }

    setResumeFormFields(copyResumeFormFields);
  };

  /* form operations - end */

  const isFormValid = () => {
    let resumePayload = {};

    /* Object.keys(formFields).forEach((key)=>{
      //console.log(formFields[key]['getter']['v']);
      resumePayload[key] = formFields[key]['getter']['v'];
    });

    resumePayload['technicalSkills'] = technicalSkills.map((ts)=> {return {"name": ts.name, "rating": ts.rating}});
    resumePayload['professionalSkills'] = professionalSkills.map((ps)=> {return {"name": ps.name, "rating": ps.rating}});
    resumePayload['experiences'] = experiences.map((exp)=> {return {"title": exp.title, "employmentType": exp.employmentType, "company": exp.company, "location": exp.location, "startDate": exp.startDate, "endDate": exp.endDate}});
 */
    return resumePayload;
  };
  const onFormSubmit = () => {
    // const payload = isFormValid();
    // console.log("onSubmit :: payload ::", payload);
    // console.log("ResumeService ::", ResumeService);
    // ResumeService.saveResume(payload);
    if(activeSection === tabs[tabs.length - 1]){
      // save
      props.closeForm();
    } else {
      setActiveSection(tabs[tabs.indexOf(activeSection) + 1]);
    }
  };

  useEffect(()=> {
  });
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
        <h1 className="title1">Add Resume</h1>
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
              {(activeSection === "intro" || activeSection === "gen") && (
                <>
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
                              onFormFieldChange(e, ["general", "name"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "name"]);
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
                            label="Title eg. Full Stack Developer @ABC"
                            variant="outlined"
                            value={resumeFormFields.general.title.value}
                            onChange={(e) => {
                              onFormFieldChange(e, ["general", "title"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "title"]);
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
                              onFormFieldChange(e, ["general", "about"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "about"]);
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
                      </Grid>
                    </CardContent>
                  </Card>
                </>
              )}

              {(activeSection === "cd" || activeSection === "gen") && (
                <>
                  <h2 className="title2">Contact Details</h2>
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={6} sx={6}>
                          <TextField
                            id="phone"
                            label="Phone"
                            type="number"
                            variant="outlined"
                            value={resumeFormFields.general.phone.value}
                            onChange={(e) => {
                              onFormFieldChange(e, ["general", "phone"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "phone"]);
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
                              onFormFieldChange(e, ["general", "email"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "email"]);
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
                              onFormFieldChange(e, ["general", "linkedIn"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "linkedIn"]);
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
                              onFormFieldChange(e, ["general", "location"]);
                            }}
                            onBlur={(e) => {
                              onFormFieldChange(e, ["general", "location"]);
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

              {activeSection === "ts" && (
                <>
                  {/* Technical skills - start */}
                  <h2 className="title2">Technical Skills</h2>
                  <Card>
                    <CardContent>
                      {resumeFormFields.technicalSkills.skills.map((ts, i) => {
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
                                  onFormFieldChange(e, [
                                    "technicalSkills",
                                    "skills",
                                    i,
                                  ]);
                                }}
                                onBlur={(e) => {
                                  onFormFieldChange(e, [
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
                                    onFormFieldChange(e, [
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
                                {i >= minTechnicalSkills && (
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

              {activeSection === "ps" && (
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
                                    onFormFieldChange(e, [
                                      "professionalSkills",
                                      "skills",
                                      i,
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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
                                      onFormFieldChange(e, [
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
                                  {i >= minProfessionalSkills && (
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

              {activeSection === "exp" && (
                <>
                  <h2 className="title2">Experience </h2>
                  <Card>
                    <CardContent className="p-rel">
                      {resumeFormFields.experiences.map((experience, i) => {
                        const expDiv = (
                          <div key={'exp'+i}>
                            <div className="snodiv">
                              {"#EXPERIENCE : " + (i + 1)}
                            </div>
                            <Grid
                              style={addResumeCont.expRowMargin}
                              container
                              spacing={2}
                            >
                              <Grid item xs={3} md={3} sx={3}>
                                <TextField
                                  id={"title" + (i + 1)}
                                  label="Title"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  value={experience.title.value}
                                  onChange={(e) => {
                                    onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "title",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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
                                      onFormFieldChange(e, [
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
                                    onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "company",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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

                              <Grid item xs={3} md={3} sx={3}>
                                <TextField
                                  id={"location" + (i + 1)}
                                  label="Location"
                                  type="text"
                                  variant="outlined"
                                  fullWidth
                                  value={experience.location.value}
                                  onChange={(e) => {
                                    onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "location",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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
                                    onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "startDate",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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
                                  value={experience.endDate.value}
                                  onChange={(e) => {
                                    onFormFieldChange(e, [
                                      "experiences",
                                      i,
                                      "endDate",
                                    ]);
                                  }}
                                  onBlur={(e) => {
                                    onFormFieldChange(e, [
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

                              <Grid item xs={1} md={1} sx={1}>
                                {i ===
                                  resumeFormFields.experiences.length - 1 && (
                                  <Tooltip
                                    title="Add New Skill"
                                    placement="bottom"
                                  >
                                    <IconButton
                                      onClick={() => {
                                        onAdd(["experiences"], "experiences");
                                      }}
                                    >
                                      <AddCircleOutlineOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {i > 0 && (
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
                        );
                        return expDiv;
                      })}
                    </CardContent>
                  </Card>
                </>
              )}

              {activeSection === "temp" && <ResumeTemplate />}
              {activeSection === "edu" && <EduTemp />}
              {activeSection === "proj" && <ProjTemp />}
              {/* {activeSection === "lang" && <LangTemp resumeFormFields={resumeFormFields} onFormFieldChange={onFormFieldChange} onAdd={onAdd} onDlt={onDlt} minTechnicalSkills={minTechnicalSkills} />} */}
              {activeSection === "cert" && <CertTemp />}
            </form>
          </Grid>
        </Grid>

        <Button
          className="pr"
          style={addResumeCont.submitBtn}
          size="large"
          variant="contained"
          color="success"
          onClick={() => {
            onFormSubmit();
          }}
        >
          {activeSection === tabs[tabs.length - 1] ? "SAVE" : "NEXT" } 
        </Button>
      </div>
    </Dialog>
  );
};
