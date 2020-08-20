import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, ScrollView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import CardWrapper from "../components/CardWrapper";
import LineGraph from "../components/LineGraph";
import * as APIHelper from "../helpers/fhir-api";

// Get screen width, e.g. to render Cards with corrent width
// const screenWidth = Math.round(Dimensions.get("window").width);

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientFHIR: {},
      dailyQuestionDone: false,
      text:
        "Du hast heute noch keinen Fragebogen ausgefüllt. Bitte klicke auf den Button um einen neuen Fraegbogen auszufüllen",
      buttonText: "Zum Fragebogen",
      questionnaireReponses: {
        "this-is-the-id": {
          name: "Das ist der Name der Frage",
          data: [1, 3, 1, 2, 1, 2, 1],
          labels: [
            "Montag",
            "Dienstag",
            "Mittwoch",
            "Donnerstag",
            "Freitag",
            "Samstag",
            "Sonntag",
          ],
        },
      },
    };
  }

  async componentDidMount() {
    let questionnaireResponses = await APIHelper.getQuestionnaireResponses();
    this.setState({ questionnaireReponses: questionnaireResponses });
  }

  render() {
    console.log(this.props);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Container>
          <StatusBar style="auto" />
          <TitleContainer>
            <Title>Profil</Title>
          </TitleContainer>
          <ContentContainer>
            <CardWrapper>
              <Text>
                Hier findest du die Ergebnisse deiner letzten Fragebögen
                grafisch aufbereitet
              </Text>
            </CardWrapper>
            {this.state.questionnaireReponses ? (
              Object.keys(this.state.questionnaireReponses).map(
                (key, index) => {
                  return (
                    <GraphContainer key={index}>
                      <GraphTitle>
                        {this.state.questionnaireReponses[key].name}
                      </GraphTitle>
                      <LineGraph
                        labels={this.state.questionnaireReponses[key].labels}
                        data={this.state.questionnaireReponses[key].data}
                        width={Dimensions.get("window").width}
                      />
                    </GraphContainer>
                  );
                }
              )
            ) : (
              <Text>Keine Daten gefunden</Text>
            )}
          </ContentContainer>
        </Container>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;

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

const ContentContainer = styled.ScrollView`
  overflow: visible;
`;

const Subtitle = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  color: #b8bece;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 17px;
`;

const GraphTitle = styled.Text`
  font-size: 15px;
`;

const GraphContainer = styled.View`
  margin-top: 30px;
`;
