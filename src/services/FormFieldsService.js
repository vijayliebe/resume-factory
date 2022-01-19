import { FormService } from "./FormService";
const addResumeForm = FormService;

const fieldsMinCount = {
  "educations": 2,
  "projects": 1,
  "certificates": 1,
  "languages": 2
}

const fields = {
  "educations": {
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
  "projects": {
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
    current: addResumeForm.getGeneralFieldObj([], false)
  },
  "certificates":{
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
  "languages": {
    lang: new Array(fieldsMinCount.languages).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required])
    ),
    ratings: new Array(fieldsMinCount.languages).fill(
      addResumeForm.getGeneralFieldObj([addResumeForm.validators.required], 1)
    ),
  }
}
const getFieldsMinCount = (name) => {
    return fieldsMinCount[name];
}
const getFields = (name) => {
    return fields[name];
}
const getFieldList = (name) => {
    if(["languages"].includes(name)){
        return getFields(name);
    } else {
        return new Array(fieldsMinCount[name]).fill(getFields(name));
    }
}

export const FormFieldService = {
    getFieldsMinCount,
    getFields,
    getFieldList
}