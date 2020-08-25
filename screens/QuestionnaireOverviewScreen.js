import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Dimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import SingleActionCard from "../components/SingleActionCard";
import CardWrapper from "../components/CardWrapper";
import * as APIHelper from "../helpers/fhir-api";

// Get screen width, e.g. to render Cards with corrent width
// const screenWidth = Math.round(Dimensions.get("window").width);

class QuestionnaireOverviewScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      patientFHIR: {},
      dailyQuestionDone: false,
      text:
        "Herzlich Willkommen! Klicke auf den Button um einen neuen Fragebogen auszufüllen.",
      buttonText: "Zum Fragebogen",
      questionnaire: false,
    };
  }

  // TODO: Load questionnaire Data
  // TODO: Check if daily questionnaire already done
  async componentDidMount() {
    let questionnaire = await APIHelper.getQuestionnaire();
    let patient = await APIHelper.getPatient();
    this.setState({ questionnaire: questionnaire });
    this.setState({ patientFHIR: patient });
    this.setState({ loading: false });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Container>
          <StatusBar style="auto" />
          <TitleContainer>
            <Title>Dateneingabe</Title>
          </TitleContainer>
          <ContentContainer>
            {!this.state.loading ? (
              <SingleActionCard
                text={this.state.text}
                buttonText={this.state.buttonText}
                callBack={() =>
                  this.props.navigation.push("Questionnaire", {
                    questionnaire: this.state.questionnaire,
                    patient: this.state.patientFHIR,
                  })
                }
              />
            ) : (
              <CardWrapper>
                <Text>Lädt</Text>
              </CardWrapper>
            )}
          </ContentContainer>
        </Container>
      </SafeAreaView>
    );
  }
}

export default QuestionnaireOverviewScreen;

const Container = styled.View`
  background-color: white;
  flex: auto;
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 15px;
  padding-right: 15px;
`;

const TitleContainer = styled.View`
  margin-bottom: 20px;
  z-index: 1;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 35px;
  color: #1063a9;
`;

const Text = styled.Text``;

const ContentContainer = styled.ScrollView`

`;

const Subtitle = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  color: #b8bece;
`;
