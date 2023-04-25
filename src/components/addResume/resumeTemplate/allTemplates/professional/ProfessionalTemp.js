import React, { useState } from "react";
import "./professionalTemp.scss";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faEnvelope,
  faPhone,
  faMapMarker,
  faCircle,
  faAngleRight,
  faPrint,
  faBell,
  faBiking,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg } from "@fortawesome/free-regular-svg-icons";

export const ProfessionalTemp = (props) => {
  const onPrintPreviewBtnClick = () => {
    window.print();
  };

  const transformDate = (dtStr, format) => {
    let date = dtStr ? new Date(dtStr) : new Date();
    const monthList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = date.getDate(),
      m = date.getMonth() + 1,
      y = date.getFullYear();

    const formatMap = {
      "d-m-y": (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y,
      "m-y": monthList[m - 1] + " " + y,
      y: y,
    };

    return formatMap[format] || formatMap["m-y"];
  };

  return (
    <>
      <h4>Professional Resume</h4>

      <Button
        className="print-btn"
        size="large"
        variant="contained"
        color="primary"
        onClick={() => {
          onPrintPreviewBtnClick();
        }}
      >
        <FontAwesomeIcon icon={faPrint} /> &nbsp; PRINT
      </Button>

      <hr />
      <div id="section-to-print" className="resume-temp-main-cont">
        <div className="head">
          <h1 className="title">{props.resumeData.general.name}</h1>
          <div class="contact-details">
            <span class="cd">{props.resumeData.general.location}</span>
            <span class="dot-seperator">.</span>
            <span class="cd">{props.resumeData.general.phone}</span>
            <span class="dot-seperator">.</span>
            <span class="cd">{props.resumeData.general.email}</span>
            <span class="dot-seperator">.</span>
            <span class="cd">{props.resumeData.general.linkedIn.replace("https://", "")}</span>
          </div>
        </div>

        {/* <div class="line-seperator"></div> */}

        <div className="experience">
          <div className="cont-title">PROFESSIONAL EXPERIENCE</div>
          {props.resumeData.experiences.map((exp) => {
            const expHtml = (
              <div key={exp.company} className="experience-item">
                <div className="exp-title1">
                  <span class="exp-duration">
                    {transformDate(exp.startDate)} -{" "}
                    {exp.current ? "Present" : transformDate(exp.endDate)}
                  </span>
                  <span className="comp">{exp.company}, </span>
                  <span className="comp-addr">{exp.location}</span>
                </div>
                <div className="exp-title2">
                  <span className="exp-desig">{exp.title} </span>{" "}
                </div>
                <div className="resp">
                  {exp.roles.split("\n").map((role) => {
                    return (
                      <>
                        <div className="respItem">
                           <span className="rolse-desc">{role}</span>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
            return expHtml;
          })}
        </div>

        <div className="education m-t">
          <div className="cont-title">EDUCATION</div>
          {props.resumeData.educations.map((edu, i) => {
            const eduHtml = (
              <>
                <div className="edu-item">
                  <div className="line">
                    <div className="year">
                      {transformDate(edu.startDate, "y") ==
                      transformDate(edu.endDate, "y")
                        ? transformDate(edu.endDate, "y")
                        : transformDate(edu.startDate, "y") +
                          " - " +
                          transformDate(edu.endDate, "y")}
                    </div>
                    <div>
                      <span className="insti">{edu.school.split(",")[0]}</span>
                      <span className="add">
                        ,{edu.school.split(",").slice(1).join(",")}
                      </span>
                    </div>
                    <div className="degree">{edu.degree}</div>
                  </div>
                </div>
              </>
            );
            if(i < 2){
                return eduHtml;
            }
          })}
        </div>

        <div className="skills">
          <div className="cont-title">SKILLS</div>

          {props.resumeData.technicalSkills.ratings.map((rating, i) => {
              const skill = props.resumeData.technicalSkills.skills[i];
              const tsHtml = (
                <>
                  <div className="skill-name">
                  {skill}
                  </div>

                </>
              );
              return tsHtml;
            })}
        </div>
      </div>
    </>
  );
};
