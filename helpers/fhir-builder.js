// TODO: Takes questionnaire in FHIR format and transforms it into questionnaire object that can be used by the Questionnaire Component
export const formatQuestionnaire = (questionnaireFhir) => {
  var questionnaireObject = {};

  return questionnaireObject;
};

// TODO: Takes questionnaire Response Object from Questionnaire Component and transforms it into an object in FHIR format
export const formatQuestionnaireResponse = (
  responses,
  questionnaire,
  patient
) => {
  console.log(responses);

  // Create base instance of Resource
  var questionnaireResponseFHIR = {
    resourceType: "QuestionnaireResponse",
    // questionnaire: "ReferenceQuestionnaire",
    // source: "ReferencePatient",
    status: "completed",
    authored: "2020-08-19T14:48:14.463Z",
    item: [],
  };

  // TODO: Iterate through items of questionnaire
  for (var item of questionnaire.item) {
    newItem = { linkId: item.linkId };
    if (item.type == "group") {
      newItem.item = [];
      // Iterate through child items
      for (var childItem of item.item) {
        if (childItem.type != "group") {
          newChildItem = {
            linkId: childItem.linkId,
            text: childItem.text,
            answer: [responses[childItem.linkId]],
          };
          console.log(responses[childItem.linkId]);
          if (
            responses[childItem.linkId] &&
            responses[childItem.linkId] != ""
          ) {
            newItem.item.push(newChildItem);
          }
        }
      }
      questionnaireResponseFHIR.item.push(newItem);
    } else {
      questionnaireResponseFHIR.item.push(newItem);
    }
  }

  // TODO: Iterate through questionnaire to get same structure in questionnaire response object
  // for (var item of questionnaire.item) {
  // }
  return questionnaireResponseFHIR;
};

export const getVisualizationData = (
  questionnaireResponsesArray,
  questionnaire
) => {
  return [];
};
