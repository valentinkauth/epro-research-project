import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import ButtonBottom from "../components/ButtonBottom";
import { SafeAreaView } from "react-navigation";
import QuestionCard from "../components/QuestionCard";
import * as APIHelper from "../helpers/fhir-api";
import * as FHIRHelper from "../helpers/fhir-builder";

export default class QuestionnaireScreen extends React.Component {
  static navigationOptions = {
    showHeader: false,
  };

  constructor(props) {
    super(props);
    // Bind asynchronous handler functions
    this.sendAnswers = this.sendAnswers.bind(this);
  }

  state = {
    patient: this.props.navigation.state.params.patient,
    questionnaire: this.props.navigation.state.params.questionnaire,
    allQuestionsAnswered: false,
    answers: {},
    questions: [],
  };

  componentDidMount() {
    var questions = [];

    for (var item of this.props.navigation.state.params.questionnaire.item) {
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

    this.setState({ questions: questions });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Container>
          <CloseButtonContainer>
            <CloseButton onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="close" size={28} color="black" />
            </CloseButton>
          </CloseButtonContainer>
          <TitleContainer>
            <Title>Neuer Fragebogen</Title>
          </TitleContainer>
          <QuestionContainer>
            {this.state.questions.map((question, index) => (
              <QuestionCard
                key={index}
                type={question.type}
                linkId={question.linkId}
                title={question.text}
                answerOption={question.answerOption}
                callBack={this.addAnswer}
              />
            ))}
          </QuestionContainer>
          <ButtonContainer>
            <ButtonBottom
              text={"Fragebogen absenden"}
              handleClick={this.sendAnswers}
              disabled={!this.state.allQuestionsAnswered}
            />
          </ButtonContainer>
        </Container>
      </SafeAreaView>
    );
  }

  // Add answer to answer object of state
  addAnswer = (linkId, value) => {
    console.log("Received new answer of question " + linkId + ":" + value);
    // Get current answer object
    var updatedAnswers = this.state.answers;
    // Add new answer
    updatedAnswers[linkId] = value;

    // Update state
    this.setState({ answers: updatedAnswers });

    // Check if all questions are answered (exclude questions that are not required)
    var everythingAnswered = true;
    for (var question of this.state.questions) {
      if (question.required && !updatedAnswers[question.linkId]) {
        everythingAnswered = false;
        break;
      }
    }
    this.setState({ allQuestionsAnswered: everythingAnswered });
  };

  sendAnswers = async () => {
    // Get formatted questionnaire response object
    let questionnaireResponseFHIR = FHIRHelper.formatQuestionnaireResponse(
      this.state.answers,
      this.state.questionnaire
    );

    var result = await APIHelper.postQuestionnaireResponse(
      questionnaireResponseFHIR
    );

    // console.log(JSON.stringify(questionnaireResponseFHIR));

    // console.log(questionnaireResponseFHIR);

    // console.log(questionnaireResponseFHIR);

    // this.props.navigation.goBack();

    // TODO: Send questionnaire response object to server
    // TODO: Change button text to "Wait.."
    // TODO: Navigate back to main menu when answers were succesfully send
  };
}

const Container = styled.KeyboardAvoidingView`
  background-color: white;
  flex: auto;
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
`;

const CloseButtonContainer = styled.View`
  z-index: 999;
  height: 40px;
  background-color: white;
`;

const CloseButton = styled.TouchableOpacity`
  align-items: flex-end;
`;

const QuestionContainer = styled.ScrollView`
  overflow: visible;
  flex: 1;
  height: 20px;
  /* padding-left: 5px;
  padding-right: 5px; */
  padding-top: 5px;
  padding-bottom: 5px;
`;

const TitleContainer = styled.View`
  margin-bottom: 0px;
  z-index: 999
  background-color: white;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 35px;
  color: #1063a9;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;
