import axios from "axios";

// Command to start server
// Downloads/liberty-runtime/wlp/bin/server start fhir-server
// Command to stop server
// Downloads/liberty-runtime/wlp/bin/server stop fhir-server
const baseUrl = "http://localhost:9442/fhir-server/api/v4";
const userName = "fhiruser";
const password = "change-password";
const axiosConfig = {
  auth: {
    username: userName,
    password: password,
  },
};

const questionnaireId = "117ae457-ad49-458b-a782-3ae387239ac6";
patientId = "fd1638ce-0c26-4686-892e-deeb468b2c66";

// Get questionnaire with given ID
export const getQuestionnaire = async () => {
  // Make a request for a questionnaire with a given ID
  const response = await axios.get(
    baseUrl + "/Questionnaire/" + questionnaireId,
    axiosConfig
  );
  let data = await response.data;
  return data;
};

// Get patient with given ID
export const getPatient = async () => {
  // Make a request for a user with a given ID
  const response = await axios.get(
    baseUrl + "/Patient/" + patientId,
    axiosConfig
  );
  let data = await response.data;
  return data;
};

// TODO: Get all questionnaire responses for specific questionnaire id and patient id
export const getQuestionnaireResponses = async (questionnaire, patient) => {
  return {};
};

// Post questionnaire response to FHIR server
export const postQuestionnaireResponse = async (questionnaireResponse) => {
  const res = await axios.post(
    baseUrl + "/QuestionnaireResponse",
    questionnaireResponse,
    axiosConfig
  );
  console.log(res.data);
};

// TODO: Check if questionnaire with given id was already answered the current day by the given patient id, returns Boolean
export const dailyQuestionnaireDone = (patientId, questionnaireId) => {
  return true;
};
