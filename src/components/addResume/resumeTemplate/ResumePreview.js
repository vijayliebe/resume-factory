import React, {useState} from "react";
import { ProfessionalTemp } from "./allTemplates/professional/ProfessionalTemp";
import { ModernTemp } from "./allTemplates/modern/ModernTemp";

export const ResumePreview = (props) => {

    return (
        <>
            <h1>Resume Preview</h1>
           {/* <div>{JSON.stringify(props.selectedResumeTemp)}</div>
           <div>{JSON.stringify(props.selectedResumeTemp.name)}</div> */}

           {props.selectedResumeTemp.name == "Professional" && <ProfessionalTemp/>}
           {props.selectedResumeTemp.name === "Modern" && <ModernTemp/>}
        </>
    );
}