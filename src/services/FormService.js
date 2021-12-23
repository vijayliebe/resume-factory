let resumeFormFields, setResumeFormFields;
/* validation - start */
const validateInput = (value, validators) => {
  let errors = [];

  validators?.map((validator) => {
    let error;
    switch (validator.name) {
      case "required":
        error = ["", null, undefined].includes(value);
        break;

      case "url":
      case "email":
        const re = new RegExp(validator.pattern, "i");
        error = !["", null, undefined].includes(value) ? !re.test(value) : "";
        break;
    }
    if (error) errors.push(validator.errorMessage);
  });
  return errors;
};

const validators = {
  required: { name: "required", errorMessage: "Required" },
  email: {
    name: "email",
    pattern:
      "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+",
    errorMessage: "Invalid email",
  },
  url: {
    name: "url",
    pattern:
      "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
    errorMessage: "Invalid Url",
  },
};
/* validation - end */

/* form operations - start */

const date = new Date();
const d = date.getDate(),
  m = date.getMonth() + 1,
  y = date.getFullYear();
const dateString =
  "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);

const generalFieldObj = {
  value: "",
  dirty: false,
  validators: [],
  errors: [],
};
const getGeneralFieldObj = (validators, value) => {
  let gfo = JSON.parse(JSON.stringify(generalFieldObj));
  gfo.value = value ?  value === "dateString" ? dateString : value : "";
  gfo.validators = validators;
  return gfo;
};

const onFormFieldChange = (e, formNames, disabled) => {
  const inputValue = e.nativeEvent
    ? e.target.type === "checkbox"
      ? e.target.checked
      : e.target.value
    : e;
  let copyResumeFormFields = JSON.parse(JSON.stringify(resumeFormFields));
  let formField = copyResumeFormFields;
  for (let fn of formNames) {
    formField = formField[fn];
  }

  if(disabled === undefined){
    // console.log("formNames ::", formNames);
    // console.log("formField ::", formField);

    const errors = validateInput(inputValue, formField.validators);
    formField.value = inputValue;
    "dirty" in formField ? (formField.dirty = true) : delete formField.dirty;
    formField.errors = errors;
  }

  formField.disabled = disabled;

  // console.log("onGeneralFieldChange :: formField ::", formField);
  // console.log("onGeneralFieldChange :: copyResumeFormFields ::", copyResumeFormFields);

  setResumeFormFields(copyResumeFormFields);
};

const init = (rff, srff) => {
  resumeFormFields = rff;
  setResumeFormFields = srff;
}
const setState = (data) => {
  setResumeFormFields(data);
}

const getState = () => {
  return resumeFormFields;
}
/* form operations - end */

const isFormValid = (formName) => {
  let valid =  true;
  let formCopy = JSON.parse(JSON.stringify(resumeFormFields));

  let iterate = (formObj) => {
    for(let i in formObj){
      let v = formObj[i];
      if(typeof formObj[i] === "object" && Object.keys(formObj[i]).includes("dirty")){
        //formObj[i] = formObj[i].value;
        const errors = validateInput(formObj[i].value, formObj[i].validators);
        formObj[i].errors = errors;
        if(errors.length){
          valid = false;
        }
      } else if(typeof v === "object") {
        iterate(v);
      } else {
        console.log("v :: ", v);
      }
    }
  }
  iterate(formCopy[formName] || formCopy);
  // console.log("isFormValid :: formName ::", formName);
  // console.log("isFormValid :: formCopy ::", JSON.parse(JSON.stringify(formCopy)));
  setState(formCopy);
  return valid;
};

const getValue = () => {
  console.log("getValue :: resumeFormFields ::", resumeFormFields);
  let formCopy = JSON.parse(JSON.stringify(resumeFormFields));
  let iterate = (formObj) => {
    for(let i in formObj){
      let v = formObj[i];
      if(typeof formObj[i] === "object" && Object.keys(formObj[i]).includes("dirty")){
        formObj[i] = formObj[i].value;
      } else if(typeof v === "object") {
        iterate(v);
      } else {
        console.log("v :: ", v);
      }
    }
  }
  iterate(formCopy);
  return formCopy;
}

export const FormService = {
  init,
  isFormValid,
  getValue,
  getGeneralFieldObj,
  onFormFieldChange,
  setState,
  getState,
  validators,
};
