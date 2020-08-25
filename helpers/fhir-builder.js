import * as constants from "./constants";

// Takes questionnaire in FHIR format and transforms it into questionnaire object that can be used by the Questionnaire Component
export const formatQuestionnaire = (questionnaireFhir) => {
  var questions = [];

  for (var item of questionnaireFhir.item) {
    if (item.type == "group") {
      for (var childItem of item.item) {
        if (childItem.type != "group") {
          questions.push(childItem);
        }
      }
    } else {
      questions.push(item);
    }
  }

  return questions;
};

// Takes questionnaire Response Object from Questionnaire Component and transforms it into an object in FHIR format
export const formatQuestionnaireResponse = (responses, questionnaire) => {
  // Create base instance of Resource
  var questionnaireResponseFHIR = {
    resourceType: "QuestionnaireResponse",
    questionnaire: questionnaire.url,
    source: {
      type: "Patient",
      reference: constants.RESOURCES_PATIENT_IDENTIFIER,
    },
    status: "completed",
    authored: new Date().toISOString(),
    item: [],
  };

  // Iterate through items of questionnaire
  for (var item of questionnaire.item) {
    var newItem = { linkId: item.linkId };
    if (item.type == "group") {
      newItem.item = [];
      // Iterate through child items
      for (var childItem of item.item) {
        if (childItem.type != "group") {
          var newChildItem = {
            linkId: childItem.linkId,
            text: childItem.text,
            answer: [responses[childItem.linkId]],
          };
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

  return questionnaireResponseFHIR;
};

// Returns merged questionnaire response data, that can be displayed in UI (react-native-chart-kit)
export const getVisualizationData = (questionnaireResponsesArray) => {
  var data = {
    labels: [],
    datasets: [],
    legend: [],
  };

  for (var response of questionnaireResponsesArray) {
    // Iterate through items of response
    data.labels.push(new Date(response.authored).toDateString());
    for (var item of response.item) {
      // Go one level lower is parent item contains child items (parent should be of type group)
      if (item.item && item.item.length > 0) {
        for (var childItem of item.item) {
          if (
            // Check if item is part of items to visualize
            constants.RESOURCES_QUESTIONNAIRE_RESPONSE_QUESTIONS_ANALYZE.indexOf(
              childItem.linkId
            ) >= 0
          ) {
            // Check if question already in legend and if yes, get index of question
            if (data.legend.indexOf(childItem.text) >= 0) {
              var index = data.legend.indexOf(childItem.text);
              data.datasets[index].data.push(
                childItem.answer[0].valueCoding.code
              );
            } else {
              // Create new label and new dataset with color
              data.legend.push(childItem.text);

              var customDataset = {
                data: [childItem.answer[0].valueCoding.code],
              };
              console.log(data.legend.length);

              switch (data.legend.length) {
                case 1:
                  customDataset.color = () => "#f5bfd2";
                  break;
                case 2:
                  customDataset.color = () => "#a1cdec";
                  break;
                case 3:
                  customDataset.color = () => "#e5db9c";
                  break;
                case 4:
                  customDataset.color = () => "#beb4c5";
                  break;
                default:
                  customDataset.color = () => "#e6a57e";
              }
              data.datasets.push(customDataset);
            }
          }
        }
      }
    }
  }

  return data;
};

export const getColor = (index) => {
  return constants.VISUALIZATION_COLORS[index];
};
