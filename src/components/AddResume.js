import React, {useState} from "react";
import { TextField, Grid, Card, CardContent, CardActions, Slider, InputLabel, MenuItem, FormControl, Select, IconButton, Tooltip } from "@mui/material";
import { Add, Delete } from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { borderBottom } from "@mui/system";

export const AddResume = (props) => {
  const addResumeCont = {
    main: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      background: "#fff",
      zIndex: "9999",
      boxSizing: "border-box",
      padding: "1em",
      overflow: "scroll"
    },
    form: {
      marginTop: "20px",
    },
    addDltBtn: {
        paddingTop: "16px"
    },
    skillRowMargin: {
      marginBottom: "20px"
    }
  };

  const [name, setName] = useState({v: "", d: false});
  const [title, setTitle] = useState({v: "", d: false});
  const [about, setAbout] = useState({v: "", d: false});

  const [phone, setPhone] = useState({v: "", d: false});
  const [email, setEmail] = useState({v: "", d: false});
  const [linkedIn, setLinkedIn] = useState({v: "", d: false});
  const [location, setLocation] = useState({v: "", d: false});

  let technicalSkillsList = [{name: "JS", rating: "8"}, {name: "React", rating: "6"}, {name: "Angular2", rating: "9"}]
  const [technicalSkills, setTechnicalSkills] = useState(technicalSkillsList);

  const formFields = {
    "name": {getter: name, setter: setName, errorMessage: "Name is required"},
    "title": {getter: title, setter: setTitle, errorMessage: "Title is required"},
    "about": {getter: about, setter: setAbout, errorMessage: "Provide about yourself"},

    "phone": {getter: phone, setter: setAbout, errorMessage: "Phone is required"},
    "email": {getter: email, setter: setEmail, errorMessage: "Email is required"},
    "linkedIn": {getter: linkedIn, setter: setLinkedIn, errorMessage: "LinkedIn Url is required"},
    "location": {getter: location, setter: setLocation, errorMessage: "Location is required"},
  }

  const onChange = (e) => {
    // console.log("onChange :: e.target ::", e.target);
    const [setter, value] = [formFields[e.target.id]['setter'], e.target.value];
    setter({v: value, d: true});
  }

  const onBlue = (e) => {
    const [setter, value] = [formFields[e.target.id]['setter'], e.target.value];
    setter({v: value, d: true});
  }

  const getError = (fieldName) => {
    console.log("getError :: fieldName ::", fieldName);
    return formFields[fieldName]['getter']['d'] && formFields[fieldName]['getter']['v'] === "";
  }

  const getErrorText = (fieldName) => {
    console.log("getErrorText :: fieldName ::", fieldName);
    return formFields[fieldName]['getter']['d'] && formFields[fieldName]['getter']['v'] === "" ? formFields[fieldName]["errorMessage"] : "";
  }

  const onChangeTechnicalSkill = (index, key, value) => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList[index][key] = value?.toString();
    setTechnicalSkills(technicalSkillsList);
  }

  const onAddSkill = () => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList.push({"name": "", rating: ""});
    setTechnicalSkills(technicalSkillsList);
  }
  const onDltSkill = (index) => {
    technicalSkillsList = JSON.parse(JSON.stringify(technicalSkills));
    technicalSkillsList.splice(index, 1);
    setTechnicalSkills(technicalSkillsList);
  }

  const onSubmit = (data) => {
    console.log("onSubmit :: data ::", data);
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
                  rows={4}
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
                  error={about && getError("about")}
                  helperText={about && getErrorText("about")}
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

        <h2 className="title2">Technical Skills</h2>
        <Card>
          <CardContent>
            {technicalSkills.map((ts, i)=>{
              const tsdiv = <Grid style={addResumeCont.skillRowMargin} container spacing={2}>
                              <Grid item xs={5} md={5} sx={5}>
                                <TextField
                                  id="outlined-basic"
                                  label="Skill Name"
                                  type="text"
                                  value={ts.name}
                                  onChange={(e)=>{onChangeTechnicalSkill(i, 'name',e.target.value)}}
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
                                            onChange={(e)=>{onChangeTechnicalSkill(i, 'rating', e.target.value)}}
                                            min={1}
                                            max={10}/>
                                  </div>
                                
                              </Grid>
                              <Grid item xs={2} md={2} sx={2}>
                                    <div style={addResumeCont.addDltBtn}>
                                        {i === technicalSkills.length - 1 &&
                                          <Tooltip title="Add New Skill" placement="bottom">
                                          <IconButton onClick={()=>{onAddSkill()}}>
                                            <AddCircleOutlineOutlinedIcon /> 
                                          </IconButton>
                                        </Tooltip>
                                        }
                                       
                                        <Tooltip title="Delete Skill" placement="bottom">
                                          <IconButton onClick={()=>{onDltSkill(i)}}>
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

        <h2 className="title2">Professional Skills</h2>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5} md={5} sx={5}>
                <TextField
                  id="outlined-basic"
                  label="Skill Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={5} md={5} sx={5}>
                  <div className="customInputBorder">
                    <div className="customInputBorderLabel">Rating</div>
                    <Slider
                            aria-label="Rating"
                            defaultValue={1}
                            valueLabelDisplay="auto"
                            marks
                            min={1}
                            max={10}/>
                  </div>
                
              </Grid>
              <Grid item xs={2} md={2} sx={2}>
                    <div style={addResumeCont.addDltBtn}>
                        <AddCircleOutlineOutlinedIcon /> <Delete />
                    </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <h2 className="title2">Experience <AddCircleOutlineOutlinedIcon /></h2>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4} md={4} sx={4}>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} md={4} sx={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Employment Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        label="Employment Type"
                    >
                        <MenuItem value={10}>Full-time</MenuItem>
                        <MenuItem value={20}>Part-time</MenuItem>
                        <MenuItem value={30}>Self-employed</MenuItem>
                    </Select>
                    </FormControl>
              </Grid>

              <Grid item xs={4} md={4} sx={4}>
                <TextField
                  id="outlined-basic"
                  label="Company"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} md={4} sx={4}>
                <TextField
                  id="outlined-basic"
                  label="Location"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} md={4} sx={4}>
                <TextField
                  id="outlined-basic"
                  label="Start Time"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={4} md={4} sx={4}>
                <TextField
                  id="outlined-basic"
                  label="End Time"
                  type="text"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2} md={2} sx={2}>
                    <div style={addResumeCont.addDltBtn}>
                         <Delete />
                    </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <input type="submit" />
      </form>
    </div>
  );
};
