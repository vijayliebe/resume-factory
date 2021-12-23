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
  const [activeSection, setActiveSection] = useState("general");
  const minTechnicalSkills = 4;
  const minProfessionalSkills = 2;
  const minExp = 1;

  /* form operations - start */
  const addResumeForm = FormService;

  const fieldsmap = {
    experiences: {
      title: addResumeForm.getGeneralFieldObj([
        addResumeForm.validators.required,
      ]),
      employmentType: addResumeForm.getGeneralFieldObj(
        [addResumeForm.validators.required],
        "fullTime"
      ),
      company: addResumeForm.getGeneralFieldObj([
        addResumeForm.validators.required,
      ]),
      location: addResumeForm.getGeneralFieldObj([
        addResumeForm.validators.required,
      ]),
      startDate: addResumeForm.getGeneralFieldObj(
        [addResumeForm.validators.required],
        "dateString"
      ),
      endDate: addResumeForm.getGeneralFieldObj(
        [addResumeForm.validators.required],
        "dateString"
      ),
      roles: addResumeForm.getGeneralFieldObj([
        addResumeForm.validators.required,
      ]),
      current: addResumeForm.getGeneralFieldObj()
    },
  };

  const generalFields = {
    name: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    title: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    about: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    phone: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    email: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
      addResumeForm.validators.email,
    ]),
    linkedIn: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
      addResumeForm.validators.url,
    ]),
    location: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
  };

  const technicalSkillFields = {
    skills: new Array(minTechnicalSkills).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
    ),
    ratings: new Array(minTechnicalSkills).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
    ),
  };

  const professionalSkillFields = {
    skills: new Array(minProfessionalSkills).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
    ),
    ratings: new Array(minProfessionalSkills).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
    ),
  };

  const experiencesFields = [fieldsmap.experiences];

  const resumeFormFieldsObj = {
    general: generalFields,
    technicalSkills: technicalSkillFields,
    professionalSkills: professionalSkillFields,
    experiences: experiencesFields,
    educations: [],
    projects: [],
    certificates: [],
    languages: {},
    template: {}
  };

  const [resumeFormFields, setResumeFormFields] = useState(resumeFormFieldsObj);
  addResumeForm.init(resumeFormFields, setResumeFormFields);
  // console.log("resumeFormFields ::", resumeFormFields);

  /* form operations - end */

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

  const onFormSubmit = () => {
    console.log("onFormSubmit :: resumeFormFields ::", resumeFormFields);

    if (activeSection === tabs[tabs.length - 1]) {
      // save
      const errorTab = [];
      const tabErrors = JSON.parse(JSON.stringify(tabList));
      for(let tab in tabErrors){
        const error = !addResumeForm.isFormValid(tab)
        if(error){
          errorTab.push(tab);
          tabErrors[tab] = error;
          break;
        }
      }

      console.log("onFormSubmit :: errorTab ::", errorTab);

      if(errorTab.length){
        setActiveSection(errorTab[0]);
      } else {
        const payload = addResumeForm.getValue();
        console.log("onFormSubmit :: payload ::", payload);
        ResumeService.saveResume(payload);
        props.closeForm();
      }
      
    } else {
      if(addResumeForm.isFormValid(activeSection)){
        setActiveSection(tabs[tabs.indexOf(activeSection) + 1]);
      }
    }
  };

  useEffect(() => {
    console.log("resumeFormFields :: useEffect ::");
  }, []);
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
              {(activeSection === "intro" || activeSection === "general") && (
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
                            label="Title eg. Full Stack Developer @ABC"
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
                            type="number"
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
                                  .length > minTechnicalSkills && (
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
                                    .length > minProfessionalSkills && (
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
                              <Checkbox className="checkBox-pad"
                                {... { inputProps: { 'aria-label': 'Checkbox demo' } }}
                                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                onChange={(e)=>{
                                  addResumeForm.onFormFieldChange(e, [
                                    "experiences",
                                    i,
                                    "current",
                                  ]);

                                  addResumeForm.onFormFieldChange(e, [
                                    "experiences",
                                    i,
                                    "endDate",
                                  ], e.target.checked);
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
                                          fieldsmap["experiences"]
                                        );
                                      }}
                                    >
                                      <AddCircleOutlineOutlinedIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {resumeFormFields.experiences.length >
                                  minExp && (
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
                />
              )}
              {activeSection === "educations" && (
                <EduTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                />
              )}
              {activeSection === "projects" && (
                <ProjTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                />
              )}
              {activeSection === "languages" && (
                <LangTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                />
              )}
              {activeSection === "certificates" && (
                <CertTemp
                  addResumeForm={addResumeForm}
                  resumeFormFields={resumeFormFields}
                  setResumeFormFields={setResumeFormFields}
                  onAdd={onAdd}
                  onDlt={onDlt}
                />
              )}
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
          {activeSection === tabs[tabs.length - 1] ? "SAVE" : "NEXT"}
        </Button>
      </div>
    </Dialog>
  );
};
