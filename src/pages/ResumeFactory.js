import React, { useState, useEffect } from "react";
import { ListResume } from "../components/ListResume";
import { ResumeService } from "../services/ResumeService";

export const ResumeFactory = () => {
  const [resumes, setResumes] = useState([]);

  const fetchResumes = () => {
    const resumes = ResumeService.getResumes();
    setResumes(resumes);
  };

  // fetch resumes
  useEffect((e) => {
    fetchResumes();
  }, []);

  return (
    <div className="main-cont">
      <ListResume resumes={resumes} fetchResumes={fetchResumes} />
    </div>
  );
};
