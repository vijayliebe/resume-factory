import React, {useState} from "react";
import { Alert, Button, TextField, Grid, Card, CardContent, CardActions, Slider, InputLabel, MenuItem, FormControl, Select, IconButton, Tooltip } from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {ResumeService} from '../services/ResumeService'

export const AddResume = (props) => {
  const addResumeCont = {
    main: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "#fff",
      zIndex: "1",
      boxSizing: "border-box",
      padding: "1em",
      overflow: "scroll"
    },
    form: {
      marginTop: "20px",
      height: "calc(100vh - 200px)",
      overflow: "scroll",
      marginTop: "20px"
    },
    addDltBtn: {
        paddingTop: "16px"
    },
    skillRowMargin: {
      marginBottom: "20px"
    },
    submitBtn:{
      marginTop: "15px",
      marginLeft: "2em",
      float: "left"
    }
  };

  const [name, setName] = useState({v: ""});
  const [title, setTitle] = useState({v: "", d: false});
  const [about, setAbout] = useState({v: "", d: false});

  const [phone, setPhone] = useState({v: "", d: false});
  const [email, setEmail] = useState({v: "", d: false});
  const [linkedIn, setLinkedIn] = useState({v: "", d: false});
  const [location, setLocation] = useState({v: "", d: false});

  const formFields = {
    "name": {getter: name, setter: setName, errorMessage: "Name is required"},
    "title": {getter: title, setter: setTitle, errorMessage: "Title is required"},
    "about": {getter: about, setter: setAbout, errorMessage: "Provide about yourself"},

    "phone": {getter: phone, setter: setPhone, errorMessage: "Phone is required"},
    "email": {getter: email, setter: setEmail, errorMessage: "Email is required"},
    "linkedIn": {getter: linkedIn, setter: setLinkedIn, errorMessage: "LinkedIn Url is required"},
    "location": {getter: location, setter: setLocation, errorMessage: "Location is required"},
  }

  const onChange = (e) => {
    // console.log("onChange :: e.target ::", e.target);
    const [setter, value, getter] = [formFields[e.target.id]['setter'], e.target.value, formFields[e.target.id]['getter']];
    if('d' in getter) 
      setter({v: value, d: true })
    else 
      setter({v: value });
  }

  const onBlue = (e) => {
    const [setter, value, getter] = [formFields[e.target.id]['setter'], e.target.value, formFields[e.target.id]['getter']];
    if('d' in getter) 
      setter({v: value, d: true })
    else 
      setter({v: value });
  }

  const getError = (fieldName) => {
    console.log("getError :: fieldName ::", fieldName);
    return formFields[fieldName]['getter']['d'] && formFields[fieldName]['getter']['v'] === "";
  }

  const getErrorText = (fieldName) => {
    console.log("getErrorText :: fieldName ::", fieldName);
    return formFields[fieldName]['getter']['d'] && formFields[fieldName]['getter']['v'] === "" ? formFields[fieldName]["errorMessage"] : "";
  }

  /* Technical skills - start */
  let technicalSkillsList = [{name: "", rating: "1", name_d: false}]
  const [technicalSkills, setTechnicalSkills] = useState(technicalSkillsList);
  const onChangeTechnicalSkill = (index, key, value) => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList[index][key] = value?.toString();
    technicalSkillsList[index][key+'_d'] = true;
    setTechnicalSkills(technicalSkillsList);
  }

  const onTechAddSkill = () => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList.push({"name": "", rating: "1", name_d: false});
    setTechnicalSkills(technicalSkillsList);
  }
  const onTechDltSkill = (index) => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList.splice(index, 1);
    setTechnicalSkills(technicalSkillsList);
  }
  /* Technical skills - end */


  /* Professional skills - start */
  let professionalSkillsList = [{name: "", rating: "1", name_d: false}]
  const [professionalSkills, setProfessionalSkills] = useState(professionalSkillsList);
  const onChangeProfessionalSkill = (index, key, value) => {
    professionalSkillsList = JSON.parse(JSON.stringify(professionalSkills));
    professionalSkillsList[index][key] = value?.toString();
    professionalSkillsList[index][key+'_d'] = true;
    setProfessionalSkills(professionalSkillsList);
  }

  const onProfAddSkill = () => {
    let professionalSkillsCopy = JSON.parse(JSON.stringify(professionalSkills));
    professionalSkillsCopy.push(professionalSkillsList);
    setProfessionalSkills(professionalSkillsCopy);
  }
  const onProfDltSkill = (index) => {
    let professionalSkillsCopy = JSON.parse(JSON.stringify(professionalSkills));
    professionalSkillsCopy.splice(index, 1);
    setProfessionalSkills(professionalSkillsCopy);
  }
  /* Professional skills - end */

  /* Experiance - start */
  const date = new Date();
  const d = date.getDate(), m = date.getMonth() + 1, y = date.getFullYear();
  const dateString = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  let experienceList = [{"title": "", "employmentType": "fullTime", "company": "", "location": "", "startDate": dateString, "endDate": dateString, "d_employmentType": "", "d_company": "", "d_location": "", "d_startDate": "", "d_endDate": ""}];
  const [expereinces, setExperience] = useState(experienceList);

  const onChangeExperience = (index, key, value) => {
    let expereincesCopy = JSON.parse(JSON.stringify(expereinces));
    expereincesCopy[index][key] = value?.toString();
    if (key+'_d' in expereincesCopy[index]) expereincesCopy[index][key+'_d'] = true;
    setExperience(expereincesCopy);
  }

  const onExperienceAdd = () => {
    let expereincesCopy = JSON.parse(JSON.stringify(expereinces));
    expereincesCopy.push(experienceList);
    setExperience(expereincesCopy);
  }

  const onExperienceDlt = (index) => {
    let expereincesCopy = JSON.parse(JSON.stringify(expereinces));
    expereincesCopy.splice(index, 1);
    setExperience(expereincesCopy);
  }
  /* Experiance - end */

  const isFormValid = () => {
    let resumePayload = {};

    Object.keys(formFields).forEach((key)=>{
      //console.log(formFields[key]['getter']['v']);
      resumePayload[key] = formFields[key]['getter']['v'];
    });

    resumePayload['technicalSkills'] = technicalSkills.map((ts)=> {return {"name": ts.name, "rating": ts.rating}});
    resumePayload['professionalSkills'] = professionalSkills.map((ps)=> {return {"name": ps.name, "rating": ps.rating}});
    resumePayload['expereinces'] = expereinces.map((exp)=> {return {"title": exp.title, "employmentType": exp.employmentType, "company": exp.company, "location": exp.location, "startDate": exp.startDate, "endDate": exp.endDate}});

    return resumePayload;
  }
  const onFormSubmit = () => {
    const payload = isFormValid();
    console.log("onSubmit :: payload ::", payload);
    console.log("ResumeService ::", ResumeService);
    // ResumeService.saveResume(payload);
    props.closeForm();
  }

  return (
    <div style={addResumeCont.main}>
      <h1 className="title1">Add Resume</h1>
      <hr></hr>
      <div
        className="closeBtn"
        onClick={() => {
          props.closeForm();
        }}
      >
        <div className="closeBtntxt">X</div>
      </div>

      <form style={addResumeCont.form}>
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
                  value={name.v}
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={name && getError("name")}
                  helperText={name && getErrorText("name")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={6} sx={6}>
                <TextField
                  id="title"
                  label="Title eg. Full Stack Developer @ABC"
                  variant="outlined"
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={title && getError("title")}
                  helperText={title && getErrorText("title")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="about"
                  label="About Yourself..."
                  multiline
                  rows={2}
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={about && getError("about")}
                  helperText={about && getErrorText("about")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <h2 className="title2">Contact Details</h2>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={3} md={3} sx={3}>
                <TextField
                  id="phone"
                  label="Phone"
                  type="number"
                  variant="outlined"
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={phone && getError("phone")}
                  helperText={phone && getErrorText("phone")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3} md={3}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={email && getError("email")}
                  helperText={email && getErrorText("email")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3} md={3}>
                <TextField
                  id="linkedIn"
                  label="LinkedIn Url"
                  type="text"
                  variant="outlined"
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={linkedIn && getError("linkedIn")}
                  helperText={linkedIn && getErrorText("linkedIn")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3} md={3}>
                <TextField
                  id="location"
                  label="Present location eg. Bangalore"
                  type="text"
                  variant="outlined"
                  onChange={(e)=>{onChange(e)} }
                  onBlur={(e)=>{onBlue(e)} }
                  error={location && getError("location")}
                  helperText={location && getErrorText("location")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Technical skills - start */}
        <h2 className="title2">Technical Skills</h2>
        <Card>
          <CardContent>
            {technicalSkills.map((ts, i)=>{
              const tsdiv = <Grid key={'row_'+i} style={addResumeCont.skillRowMargin} container spacing={2}>
                              <Grid item xs={5} md={5} sx={5}>
                                <TextField
                                  id={'name_' + (i+1)}
                                  label={'Skill Name ' + (i+1)}
                                  type="text"
                                  value={ts.name}
                                  onChange={(e)=>{onChangeTechnicalSkill(i, 'name',e.target.value)}}
                                  onBlur={(e)=>{onChangeTechnicalSkill(i, 'name',e.target.value)}}
                                  error={ts.name_d && ts.name === ""}
                                  helperText={ts.name_d && ts.name === "" ? "Provide Skill Name": ""}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={5} md={5} sx={5}>
                                  <div className="customInputBorder">
                                    <div className="customInputBorderLabel">Rating<bold>({ts.rating})</bold></div>
                                    <Slider
                                            aria-label="Rating"
                                            defaultValue={1}
                                            valueLabelDisplay="auto"
                                            marks
                                            value={ts.rating}
                                            onChange={(e)=>{onChangeTechnicalSkill(i, 'rating', e.target.value)}}
                                            min={1}
                                            max={10}/>
                                  </div>
                                
                              </Grid>
                              <Grid item xs={2} md={2} sx={2}>
                                    <div style={addResumeCont.addDltBtn}>
                                        {i === technicalSkills.length - 1 &&
                                          <Tooltip title="Add New Skill" placement="bottom">
                                          <IconButton onClick={()=>{onTechAddSkill()}}>
                                            <AddCircleOutlineOutlinedIcon /> 
                                          </IconButton>
                                        </Tooltip>
                                        }
                                       
                                        <Tooltip title="Delete Skill" placement="bottom" >
                                          <IconButton onClick={()=>{onTechDltSkill(i)}}>
                                            <Delete />
                                          </IconButton>
                                        </Tooltip>
                                    </div>
                              </Grid>
                            </Grid>
              return tsdiv;
            })}
          </CardContent>
        </Card>
        {/* Technical skills - end */}

        {/* Professional skills - start */}
        <h2 className="title2">Professional Skills</h2>
        <Card>
          <CardContent>
          {professionalSkills.map((ts, i)=>{
              const tsdiv = <Grid style={addResumeCont.skillRowMargin} container spacing={2}>
                              <Grid item xs={5} md={5} sx={5}>
                                <TextField
                                  id={'name_' + (i+1)}
                                  label={'Skill Name ' + (i+1)}
                                  type="text"
                                  value={ts.name}
                                  onChange={(e)=>{onChangeProfessionalSkill(i, 'name',e.target.value)}}
                                  onBlur={(e)=>{onChangeProfessionalSkill(i, 'name',e.target.value)}}
                                  error={ts.name_d && ts.name === ""}
                                  helperText={ts.name_d && ts.name === "" ? "Provide Skill Name": ""}
                                  variant="outlined"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={5} md={5} sx={5}>
                                  <div className="customInputBorder">
                                    <div className="customInputBorderLabel">Rating({ts.rating})</div>
                                    <Slider
                                            aria-label="Rating"
                                            defaultValue={1}
                                            valueLabelDisplay="auto"
                                            marks
                                            value={ts.rating}
                                            onChange={(e)=>{onChangeProfessionalSkill(i, 'rating', e.target.value)}}
                                            min={1}
                                            max={10}/>
                                  </div>
                                
                              </Grid>
                              <Grid item xs={2} md={2} sx={2}>
                                    <div style={addResumeCont.addDltBtn}>
                                        {i === professionalSkills.length - 1 &&
                                          <Tooltip title="Add New Skill" placement="bottom">
                                          <IconButton onClick={()=>{onProfAddSkill()}}>
                                            <AddCircleOutlineOutlinedIcon /> 
                                          </IconButton>
                                        </Tooltip>
                                        }
                                       
                                        <Tooltip title="Delete Skill" placement="bottom">
                                          <IconButton onClick={()=>{onProfDltSkill(i)}}>
                                            <Delete />
                                          </IconButton>
                                        </Tooltip>
                                    </div>
                              </Grid>
                            </Grid>
              return tsdiv;
            })}
          </CardContent>
        </Card>
        {/* Professional skills - end */}

        <h2 className="title2">Experience </h2>
        <Card>
          <CardContent>
            {expereinces.map((experience, i)=>{
               const expDiv =  <Grid style={addResumeCont.skillRowMargin} container spacing={2}>
                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={'title'+(i+1)}
                    label="Title"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={experience.title}
                    onChange={(e)=>{onChangeExperience(i, 'title',e.target.value)}}
                    onBlur={(e)=>{onChangeExperience(i, 'title',e.target.value)}}
                    error={experience.title_d && experience.title === ""}
                    helperText={experience.title_d && experience.title === "" ? "Title is required": ""}
                  />
                </Grid>
  
                <Grid item xs={4} md={4} sx={4}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Employment Type</InputLabel>
                      <Select
                          labelId={'employmentType_'+(i+1)}
                          id={'employmentType_'+(i+1)}
                          value={experience.employmentType}
                          label="Employment Type"
                          onChange={(e)=>{onChangeExperience(i, 'employmentType',e.target.value)}}
                      >
                          <MenuItem value="fullTime">Full-time</MenuItem>
                          <MenuItem value="partTime">Part-time</MenuItem>
                          <MenuItem value="selfEmployed">Self-employed</MenuItem>
                      </Select>
                      </FormControl>
                </Grid>
  
                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={'company'+(i+1)}
                    label="Company"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={experience.company}
                    onChange={(e)=>{onChangeExperience(i, 'company',e.target.value)}}
                    onBlur={(e)=>{onChangeExperience(i, 'company',e.target.value)}}
                    error={experience.company_d && experience.company === ""}
                    helperText={experience.company_d && experience.company === "" ? "Company is required": ""}
                  />
                </Grid>
  
                <Grid item xs={2} md={2} sx={2}>
                  <TextField
                    id={'location'+(i+1)}
                    label="Location"
                    type="text"
                    variant="outlined"
                    fullWidth
                    value={experience.location}
                    onChange={(e)=>{onChangeExperience(i, 'location',e.target.value)}}
                    onBlur={(e)=>{onChangeExperience(i, 'location',e.target.value)}}
                    error={experience.location_d && experience.location === ""}
                    helperText={experience.location_d && experience.location === "" ? "Location is required": ""}
                  />
                </Grid>
  
                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={'sd'+(i+1)}
                    label="Start Date"
                    type="date"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={experience.startDate}
                    onChange={(e)=>{onChangeExperience(i, 'startDate',e.target.value)}}
                    onBlur={(e)=>{onChangeExperience(i, 'startDate',e.target.value)}}
                    error={experience.startDate_d && experience.startDate === ""}
                    helperText={experience.startDate_d && experience.startDate === "" ? "Start Date is required": ""}
                  />
                </Grid>

                <Grid item xs={4} md={4} sx={4}>
                  <TextField
                    id={'ed'+(i+1)}
                    label="End Date"
                    type="date"
                    sx={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={experience.endDate}
                    onChange={(e)=>{onChangeExperience(i, 'endDate',e.target.value)}}
                    onBlur={(e)=>{onChangeExperience(i, 'endDate',e.target.value)}}
                    error={experience.endDate_d && experience.endDate === ""}
                    helperText={experience.endDate_d && experience.endDate === "" ? "End Date is required": ""}
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
    
                <Grid item xs={2} md={2} sx={2}>
                      {i === expereinces.length - 1 &&
                        <Tooltip title="Add New Skill" placement="bottom">
                          <IconButton onClick={()=>{onExperienceAdd()}}>
                            <AddCircleOutlineOutlinedIcon /> 
                          </IconButton>
                        </Tooltip>
                      }
                      
                      <Tooltip title="Delete Skill" placement="bottom">
                        <IconButton onClick={()=>{onExperienceDlt(i)}}>
                          <Delete />
                        </IconButton>
                      </Tooltip>

                </Grid>
              </Grid>
              return expDiv;
            })}
          </CardContent>
        </Card>

      </form>

      <Button className="pr" style={addResumeCont.submitBtn} variant="contained" color="success" onClick={()=>{onFormSubmit()}}>SAVE</Button>
    </div>
  );
};
