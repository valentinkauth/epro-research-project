import axios from "axios";
let base64 = require("base-64");

// Command to start server
// Downloads/liberty-runtime/wlp/bin/server start fhir-server
// Command to stop server
// Downloads/liberty-runtime/wlp/bin/server stop fhir-server

const baseUrl = "http://localhost:9442/fhir-server/api/v4";
const userName = "fhiruser";
const password = "change-password";
const newBaseUrl = "https://jsonplaceholder.typicode.com/todos/1";

// Get data from FHIR store
export const loadData = async () => {
  // Make a request for a user with a given ID
  const response = await axios.get(baseUrl, {
    // Axios looks for the `auth` option, and, if it is set, formats a
    // basic auth header for you automatically.
    auth: {
      username: userName,
      password: password,
    },
  });
  let data = await response.data;
  return JSON.stringify(data);
};

// TODO: Get questionnaire with given id from FHIR server, returns JSON object
export const getQuestionnaire = (questionnaireId) => {};

// TODO: Check if questionnaire with given id was already answered the current day by the given patient id, returns Boolean
export const dailyQuestionnaireDone = (patientId, questionnaireId) => {
  return true;
};

// TODO: POST questionnaire response to FHIR server
export const addQuestionnaireResponse = (questionnaireResponse) => {};
