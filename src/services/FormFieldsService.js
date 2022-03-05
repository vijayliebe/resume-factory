import { FormService } from "./FormService";
const addResumeForm = FormService;

const fieldsMinCount = {
  technicalSkills: 4,
  professionalSkills: 2,
  experiences: 1,
  educations: 2,
  projects: 1,
  certificates: 1,
  languages: 2,
};

const fields = {
  general: {
    resumeName: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    name: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    title: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    about: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    image: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
      addResumeForm.validators.url
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
  },
  technicalSkills: (resumeEditData) => {
    return {
      skills: new Array(
        resumeEditData?.technicalSkills?.ratings?.length || fieldsMinCount.technicalSkills
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
      ),
      ratings: new Array(
        resumeEditData?.technicalSkills?.ratings?.length || fieldsMinCount.technicalSkills
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
      ),
    };
  },
  professionalSkills: (resumeEditData) => {
    return {
      skills: new Array(
        resumeEditData?.professionalSkills?.ratings?.length ||
        fieldsMinCount.professionalSkills
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
      ),
      ratings: new Array(
        resumeEditData?.professionalSkills?.ratings?.length ||
        fieldsMinCount.professionalSkills
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
      ),
    };
  },
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
    current: addResumeForm.getGeneralFieldObj([], false),
  },
  educations: {
    school: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    degree: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    field: addResumeForm.getGeneralFieldObj(),
    startDate: addResumeForm.getGeneralFieldObj(
      [addResumeForm.validators.required],
      "dateString"
    ),
    endDate: addResumeForm.getGeneralFieldObj(
      [addResumeForm.validators.required],
      "dateString"
    ),
    grade: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
  },
  projects: {
    name: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    company: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    url: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
      addResumeForm.validators.url,
    ]),
    startDate: addResumeForm.getGeneralFieldObj(
      [addResumeForm.validators.required],
      "dateString"
    ),
    endDate: addResumeForm.getGeneralFieldObj(
      [addResumeForm.validators.required],
      "dateString"
    ),
    desc: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    tech: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    roles: addResumeForm.getGeneralFieldObj([
      addResumeForm.validators.required,
    ]),
    current: addResumeForm.getGeneralFieldObj([], false),
  },
  certificates: {
    name: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    org: addResumeForm.getGeneralFieldObj([addResumeForm.validators.required]),
    startDate: addResumeForm.getGeneralFieldObj(
      [addResumeForm.validators.required],
      "dateString"
    ),
    endDate: addResumeForm.getGeneralFieldObj([], "dateString"),
    cid: addResumeForm.getGeneralFieldObj(),
    url: addResumeForm.getGeneralFieldObj([addResumeForm.validators.url]),
  },
  languages: (resumeEditData) => {
    return {
      lang: new Array(
        resumeEditData?.languages?.ratings?.length || fieldsMinCount.languages
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
      ),
      ratings: new Array(
        resumeEditData?.languages?.ratings?.length || fieldsMinCount.languages
      ).fill(
        addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
      ),
    };
  },
};
const getFieldsMinCount = (name) => {
  return fieldsMinCount[name];
};
const getFields = (name, resumeEditData) => {
  //console.log("getFields :: name ::", name);
  if (["technicalSkills", "professionalSkills", "languages"].includes(name)) {
    return fields[name](resumeEditData);
  } else {
    return fields[name];
  }
};
const getFieldList = (name, data) => {
  if (["technicalSkills", "professionalSkills", "languages"].includes(name)) {
    return getFields(name, data);
  } else if(["general"].includes(name)){
    return getFields(name);
  }else {
    return new Array(data || fieldsMinCount[name]).fill(getFields(name));
  }
};

export const FormFieldService = {
  getFieldsMinCount,
  getFields,
  getFieldList,
};
