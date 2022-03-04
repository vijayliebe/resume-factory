import React, { useState } from "react";
import "./modernResumeTemp.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight,faEnvelope, faPhone, faMapMarker, faCircle, faAngleRight, faBell, faBiking, faHome } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleReg } from '@fortawesome/free-regular-svg-icons';

export const ModernTemp = (props) => {
  return (
    <>
      Modern Resume
    
      <FontAwesomeIcon icon={faCircleArrowRight} size="lg"/>
      <FontAwesomeIcon icon={faEnvelope} />
      <FontAwesomeIcon icon={faPhone} />
      <FontAwesomeIcon icon={faMapMarker} />
      <FontAwesomeIcon icon={faCircle} />
      <FontAwesomeIcon icon={faCircleReg} />
      <FontAwesomeIcon icon={faAngleRight} /> 


      {/* <code>{JSON.stringify(props)}</code>  */}
      <div className="main-cont">
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
            <FontAwesomeIcon icon={faCircleArrowRight} size="lg"/>
            &nbsp; PROFESSIONAL EXPERIENCE</div>
            {props.resumeData.experiences.map((exp) => {
              const expHtml = (
                <div key={exp.company} className="experience-item">
                  <div className="title1">
                    <span className="exp-desig">{exp.title}, </span>{" "}
                    <span class="exp-duration">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="title2">
                    <span className="comp">{exp.company}, </span>
                    <span className="comp-addr">{exp.location}</span>
                  </div>
                  <div className="resp">
                     {
                     exp.roles.split("\n").map((role)=>{
                         return <> <div className="respItem"> <FontAwesomeIcon icon={faAngleRight} /> {role}</div> </>;
                     })
                     }
                  </div>
                </div>
              );
              return expHtml;
            })}
          </div>
        </div>

        <div className="right-cont"></div>
      </div>
    </>
  );
};
