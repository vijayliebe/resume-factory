import React, { useState } from "react";
import "./modernResumeTemp.scss";
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

export const ModernTemp = (props) => {
  const defaultSectionPositions = {
    professionalSkills: "r",
    educations: "r",
    languages: "r",
    projects: "b",
  };
  const [sectionPosition, setSectionPosition] = useState(
    defaultSectionPositions
  );
  const onPrintPreviewBtnClick = () => {
    window.print();
  };

  const changeSectionPosition = (sectionName, position) => {
    let copy = JSON.parse(JSON.stringify(sectionPosition));
    copy[sectionName] = position;
    setSectionPosition(copy);
  };

  const transformDate = (dtStr, format) => {
    let date = dtStr ? new Date(dtStr) : new Date();
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = date.getDate(),
    m = date.getMonth() + 1,
    y = date.getFullYear();

    return (monthList[m - 1]+" "+y);
  }

  return (
    <>
      <h4>Modern Resume</h4>

      {/* 
      <FontAwesomeIcon icon={faCircleArrowRight} size="lg"/>
      <FontAwesomeIcon icon={faEnvelope} />
      <FontAwesomeIcon icon={faPhone} />
      <FontAwesomeIcon icon={faMapMarker} />
      <FontAwesomeIcon icon={faCircle} />
      <FontAwesomeIcon icon={faCircleReg} />
      <FontAwesomeIcon icon={faAngleRight} />  
      <FontAwesomeIcon icon={faPrint} />  
      */}

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

      {/* <code>{JSON.stringify(props)}</code>  */}
      <hr />

      <div id="section-to-print" className="resume-temp-main-cont">
        <div className="left-cont">
          <div className="head">
            <div className="title">{props.resumeData.general.name}</div>
          </div>

          <div className="desc">
            <div className="nm"></div>
            <div className="designation">{props.resumeData.general.title}</div>
            <div className="description">{props.resumeData.general.about}</div>
          </div>

          <div className="experience">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
              &nbsp; PROFESSIONAL EXPERIENCE
            </div>
            {props.resumeData.experiences.map((exp) => {
              const expHtml = (
                <div key={exp.company} className="experience-item">
                  <div className="title1">
                    <span className="exp-desig">{exp.title}, </span>{" "}
                    <span class="exp-duration">
                      {transformDate(exp.startDate)} - {exp.current ? "Present" : transformDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="title2">
                    <span className="comp">{exp.company}, </span>
                    <span className="comp-addr">{exp.location}</span>
                  </div>
                  <div className="resp">
                    {exp.roles.split("\n").map((role) => {
                      return (
                        <>
                          {" "}
                          <div className="respItem">
                            {" "}
                            <FontAwesomeIcon icon={faAngleRight} /> {role}
                          </div>{" "}
                        </>
                      );
                    })}
                  </div>
                </div>
              );
              return expHtml;
            })}
          </div>
          {sectionPosition.educations == "l" ? (
            <div className="education m-t">
              <div className="cont-title">
                <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
                &nbsp;EDUCATION
                <button
                  className="position-btn fr"
                  onClick={() => {
                    changeSectionPosition("educations", "r");
                  }}
                >
                  Move Right
                </button>
              </div>
              {props.resumeData.educations.map((edu) => {
                const eduHtml = (
                  <>
                    <div className="edu-item">
                      <div className="line">
                        <div className="degree">{edu.degree}</div>
                        <div>
                          <span className="insti">
                            {edu.school.split(",")[0]}
                          </span>
                          <span className="add">
                            ,{edu.school.split(",").slice(1).join(",")}
                          </span>
                        </div>
                        <div className="year">
                          {transformDate(edu.startDate)} - {transformDate(edu.endDate)}
                        </div>
                      </div>
                    </div>
                  </>
                );
                return eduHtml;
              })}
            </div>
          ) : (
            ""
          )}

          {sectionPosition.projects == "l" ? (
            <div className="projects proj-item-l">
              <div className="cont-title">
                <FontAwesomeIcon icon={faCircleArrowRight} size="lg" /> &nbsp;
                PROJECTS
                <button
                  className="position-btn fr"
                  onClick={() => {
                    changeSectionPosition("projects", "b");
                  }}
                >
                  Move Bottom
                </button>
              </div>

              {props.resumeData.projects.map((proj, i) => {
                const projHtml = (
                  <>
                    <div className="proj-item">
                      {/* <div className="left"> */}
                      <div className="caption">
                        <div className="name">
                          {i + 1}. {proj.company}
                        </div>
                        {proj.url.split(",").map((l) => {
                          return <div className="link">{l}</div>;
                        })}
                      </div>

                      <div className="desc-cont m-t">
                        <div className="desc-title">Description</div>
                        <div className="desc">{proj.desc}</div>
                      </div>

                      <div className="tect-cont m-t">
                        <div className="tech-title">Technologies</div>
                        <div className="tech">
                          <span>{proj.tech} </span>
                        </div>
                      </div>
                      {/* </div>
                      <div className="right"> */}
                      <div className="roles-title m-t">
                        Roles & Responsibilities
                      </div>

                      {proj.roles.split("\n").map((role) => {
                        return (
                          <>
                            {" "}
                            <div className="role">
                              {" "}
                              <FontAwesomeIcon icon={faAngleRight} /> {role}
                            </div>{" "}
                          </>
                        );
                      })}
                      {/* </div> */}
                      <div className="clear"></div>
                    </div>
                  </>
                );
                return projHtml;
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="right-cont">
          <div className="photo">
            <img src={props.resumeData.general.image} />
          </div>

          <div className="contact-details m-t">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" /> &nbsp;
              CONTACT DETAILS
            </div>

            <div className="contact-item">
              <div className="item-left">
                <FontAwesomeIcon icon={faPhone} size="lg" />
              </div>
              <div className="item-right">{props.resumeData.general.phone}</div>
              <div className="clear"></div>
            </div>

            <div className="contact-item">
              <div className="item-left">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </div>
              <div className="item-right">{props.resumeData.general.email}</div>
              <div className="clear"></div>
            </div>

            <div className="contact-item">
              <div className="item-left">
                <img
                  className="linkedin-icon-size"
                  src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
                />
              </div>
              <div className="item-right">
                {props.resumeData.general.linkedIn}
              </div>
              <div className="clear"></div>
            </div>

            <div className="contact-item">
              <div className="item-left">
                <FontAwesomeIcon icon={faMapMarker} size="lg" />
              </div>
              <div className="item-right">
                {props.resumeData.general.location}
              </div>
              <div className="clear"></div>
            </div>
          </div>

          <div className="technical-details m-t">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
              &nbsp;TECHNICAL SKILLS
            </div>

            {props.resumeData.technicalSkills.ratings.map((rating, i) => {
              const skill = props.resumeData.technicalSkills.skills[i];
              const tsHtml = (
                <>
                  <div className="skill">
                    <div className="left">{skill}</div>
                    <div className="right">
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => {
                        const ratingHtml = (
                          <>
                            {r <= rating ? (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircle}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircleReg}
                              />
                            )}
                          </>
                        );
                        return ratingHtml;
                      })}
                    </div>
                    <div className="clear"></div>
                  </div>
                </>
              );
              return tsHtml;
            })}
          </div>

          <div className="personal-details m-t">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
              &nbsp;PERSONAL SKILLS
            </div>

            {props.resumeData.professionalSkills.ratings.map((rating, i) => {
              const skill = props.resumeData.professionalSkills.skills[i];
              const tsHtml = (
                <>
                  <div className="skill">
                    <div className="left">{skill}</div>
                    <div className="right">
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => {
                        const ratingHtml = (
                          <>
                            {r <= rating ? (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircle}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircleReg}
                              />
                            )}
                          </>
                        );
                        return ratingHtml;
                      })}
                    </div>
                    <div className="clear"></div>
                  </div>
                </>
              );
              return tsHtml;
            })}
          </div>

          <div className="language m-t">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
              &nbsp;LANGUAGE
            </div>

            {props.resumeData.languages.ratings.map((rating, i) => {
              const lang = props.resumeData.languages.lang[i];
              const tsHtml = (
                <>
                  <div className="skill">
                    <div className="left">{lang}</div>
                    <div className="right">
                      {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((r) => {
                        const ratingHtml = (
                          <>
                            {r <= rating ? (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircle}
                              />
                            ) : (
                              <FontAwesomeIcon
                                className="circle-position"
                                icon={faCircleReg}
                              />
                            )}
                          </>
                        );
                        return ratingHtml;
                      })}
                    </div>
                    <div className="clear"></div>
                  </div>
                </>
              );
              return tsHtml;
            })}
          </div>
          {sectionPosition.educations == "r" ||
          !sectionPosition ||
          !sectionPosition?.educations ? (
            <div className="edu m-t">
              <div className="cont-title">
                <FontAwesomeIcon icon={faCircleArrowRight} size="lg" />
                &nbsp;EDUCATION
                <button
                  className="position-btn fr"
                  onClick={() => {
                    changeSectionPosition("educations", "l");
                  }}
                >
                  Move Left
                </button>
              </div>
              {props.resumeData.educations.map((edu) => {
                const eduHtml = (
                  <>
                    <div className="edu-item">
                      <div className="line">
                        <span className="degree">{edu.degree}</span>
                        <span className="year">
                          ({transformDate(edu.startDate)} - {transformDate(edu.endDate)})
                        </span>
                      </div>

                      <div className="line">
                        <span className="insti">
                          {edu.school.split(",")[0]}
                        </span>
                        <span className="add">
                          ,{edu.school.split(",").slice(1).join(",")}
                        </span>
                      </div>
                    </div>
                  </>
                );
                return eduHtml;
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="clear"></div>

        {sectionPosition.projects == "b" ? (
          <div className="projects">
            <div className="cont-title">
              <FontAwesomeIcon icon={faCircleArrowRight} size="lg" /> &nbsp;
              PROJECTS
              <button
                className="position-btn fr"
                onClick={() => {
                  changeSectionPosition("projects", "l");
                }}
              >
                Move Left
              </button>
            </div>

            {props.resumeData.projects.map((proj, i) => {
              const projHtml = (
                <>
                  <div className="proj-item">
                    <div className="left">
                      <div className="caption">
                        <div className="name">
                          {i + 1}. {proj.company}
                        </div>
                        {proj.url.split(",").map((l) => {
                          return <div className="link">{l}</div>;
                        })}
                      </div>

                      <div className="desc-cont m-t">
                        <div className="desc-title">Description</div>
                        <div className="desc">{proj.desc}</div>
                      </div>

                      <div className="tect-cont m-t">
                        <div className="tech-title">Technologies</div>
                        <div className="tech">
                          <span>{proj.tech} </span>
                        </div>
                      </div>
                    </div>
                    <div className="right">
                      <div className="roles-title">
                        Roles & Responsibilities
                      </div>

                      {proj.roles.split("\n").map((role) => {
                        return (
                          <>
                            {" "}
                            <div className="role">
                              {" "}
                              <FontAwesomeIcon icon={faAngleRight} /> {role}
                            </div>{" "}
                          </>
                        );
                      })}
                    </div>
                    <div className="clear"></div>
                  </div>
                </>
              );
              return projHtml;
            })}
          </div>
        ) : (
          ""
        )}
        <div className="clear"></div>

        <div className="footer">
          <div className="left">
            <div>Date : {transformDate()}</div>
            <div className="m-t">{props.resumeData.general.location}</div>
          </div>
          <div className="right">
            <div className="sign">{props.resumeData.general.name}</div>
          </div>
          <div className="clear"></div>
        </div>

        <div className="clear"></div>
      </div>
    </>
  );
};
