import axios from "axios";
const base64 = require("base-64");

// Command to start server
// Downloads/liberty-runtime/wlp/bin/server start fhir-server
// Command to stop server
// Downloads/liberty-runtime/wlp/bin/server stop fhir-server
const baseUrl = "http://localhost:9442/fhir-server/api/v4";
const userName = "fhiruser";
const password = "change-password";
const questionnaireName = "Testfragebogen für Krebspatienten";
const questionnaireId = "ed974827-345f-4bc1-a5b2-9a2de0f42e3c";
patientId = "fd1638ce-0c26-4686-892e-deeb468b2c66";

// Get questionnaire with set name
export const getQuestionnaire = async () => {
  // Make a request for a user with a given ID
  const response = await axios.get(
    baseUrl + "/Questionnaire/" + questionnaireId,
    {
      // Create auth header
      auth: {
        username: userName,
        password: password,
      },
    }
  );
  let data = await response.data;

  // var questionnaireObject = {};

  // if (data.resourceType == "Bundle" && data.total > 0) {
  //   data.entry.forEach((questionnaireElement) => {
  //     if (
  //       questionnaireElement.resource.resourceType == "Questionnaire" &&
  //       questionnaireElement.resource.title &&
  //       questionnaireElement.resource.title == questionnaireName
  //     ) {
  //       questionnaireObject = questionnaireElement.resource;
  //       return;
  //     }
  //   });
  // }
  return data;
};

// TODO: Check if questionnaire with given id was already answered the current day by the given patient id, returns Boolean
export const dailyQuestionnaireDone = (patientId, questionnaireId) => {
  return true;
};

// TODO: POST questionnaire response to FHIR server
export const addQuestionnaireResponse = (questionnaireResponse) => {};

// TODO: Get all responses for specific questionnaire and patient
export const getQuestionnaireResponses = async (questionnaire, patient) => {};

export const getPatient = async () => {
  // Make a request for a user with a given ID
  const response = await axios.get(baseUrl + "/Patient/" + patientId, {
    // Create auth header
    auth: {
      username: userName,
      password: password,
    },
  });
  let data = await response.data;

  return data;
};
