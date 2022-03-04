import React, {useState} from "react";
import { ProfessionalTemp } from "./allTemplates/professional/ProfessionalTemp";
import { ModernTemp } from "./allTemplates/modern/ModernTemp";

export const ResumePreview = (props) => {
    const resumeData = props.addResumeForm.getValue()
    return (
        <div className="previewResumeCont">
            <h1 className="h2Title">Resume Preview</h1>
          {/* <div>{JSON.stringify(props.selectedResumeTemp)}</div>
            <div>{JSON.stringify(props.selectedResumeTemp.name)}</div> */}

           {props.selectedResumeTemp.name == "Professional" && <ProfessionalTemp resumeData={resumeData}/>}
           {props.selectedResumeTemp.name === "Modern" && <ModernTemp resumeData={resumeData}/>}
        </div>
    );
}