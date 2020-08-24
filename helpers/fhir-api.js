import axios from "axios";
import * as constants from "./constants";

// Command to start server
// Downloads/liberty-runtime/wlp/bin/server start fhir-server
// Command to stop server
// Downloads/liberty-runtime/wlp/bin/server stop fhir-server

// Assign server variables
const baseUrl = constants.SERVER_BASE_URL;
const axiosConfig = {
  headers: {
    accept: "application/fhir+json",
    "content-type": "application/fhir+json",
  },
  auth: {
    username: constants.SERVER_USERNAME,
    password: constants.SERVER_PASSWORD,
  },
};

// Get questionnaire with given ID
export const getQuestionnaire = async () => {
  try {
    // Make a request for a questionnaire with a given ID
    const response = await axios.get(
      constants.SERVER_BASE_URL +
        "/Questionnaire?identifier=" +
        constants.RESOURCES_QUESTIONNAIRE_IDENTIFIER,
      axiosConfig
    );
    let data = await response.data;

    // Check if matching resources were found in search query
    if (data.entry && data.total && data.total > 0) {
      console.log(
        "Questionnaire resource with ID " +
          constants.RESOURCES_QUESTIONNAIRE_IDENTIFIER +
          " loaded from server"
      );
      if (data.total > 1) {
        console.log(
          "Note: More than one questionnaire resource found with same id. Total: " +
            data.total
        );
      }
      return data.entry[0].resource;
    } else {
      console.log(
        "Questionnaire Resource with ID " +
          constants.RESOURCES_QUESTIONNAIRE_IDENTIFIER +
          " was not found"
      );
      return {};
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

// Get patient with given ID
export const getPatient = async () => {
  try {
    // Make a request for a patient with a given ID
    const response = await axios.get(
      constants.SERVER_BASE_URL +
        "/Patient?identifier=" +
        constants.RESOURCES_PATIENT_IDENTIFIER,
      axiosConfig
    );
    let data = await response.data;

    // Check if matching resources were found in search query
    if (data.entry && data.total && data.total > 0) {
      console.log(
        "Patient resource with ID " +
          constants.RESOURCES_PATIENT_IDENTIFIER +
          " loaded from server"
      );
      if (data.total > 1) {
        console.log(
          "Note: More than one patient resource found with same id. Total: " +
            data.total
        );
      }
      return data.entry[0].resource;
    } else {
      console.log(
        "Patient Resource with ID " +
          constants.RESOURCES_PATIENT_IDENTIFIER +
          " was not found"
      );
      return {};
    }
  } catch (err) {
    console.log(err);
    return {};
  }
};

// TODO: Get all questionnaire responses for specific questionnaire id and patient id
export const getQuestionnaireResponses = async (questionnaire, patient) => {
  try {
    // Make a request for all responses with given patient id and questionnaire url
    const response = await axios.get(
      constants.SERVER_BASE_URL +
        "/QuestionnaireResponse?source=" +
        constants.RESOURCES_PATIENT_IDENTIFIER +
        "&questionnaire=" +
        constants.RESOURCES_QUESTIONNAIRE_URI,
      axiosConfig
    );
    let data = await response.data;
    console.log(data.total);
  } catch (err) {
    return {};
  }
};

// Post questionnaire response to FHIR server
export const postQuestionnaireResponse = async (questionnaireResponse) => {
  const data = JSON.stringify(questionnaireResponse);

  console.log(data);

  const res = await axios.post(
    baseUrl + "/QuestionnaireResponse",
    data,
    axiosConfig
  );
  console.log(res.data);
};

// TODO: Check if questionnaire with given id was already answered the current day by the given patient id, returns Boolean
export const dailyQuestionnaireDone = (patientId, questionnaireId) => {
  return true;
};
