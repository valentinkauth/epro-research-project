import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import CardWrapper from "../components/CardWrapper";
import LineGraph from "../components/LineGraph";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as APIHelper from "../helpers/fhir-api";
import * as FHIRHelper from "../helpers/fhir-builder";

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
      visualizationData: null,
      questionnaireReponses: {
        "this-is-the-id": {
          name: "Allgemeine Fragen",
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
    this.fetchData();
  }

  fetchData = async () => {
    // Get responses in FHIR format from server
    let questionnaireResponses = await APIHelper.getQuestionnaireResponses();
    // Translate FHIR format into UI-readable format
    let mergedData = FHIRHelper.getVisualizationData(questionnaireResponses);

    console.log(mergedData);

    // TODO: Translate data into UI-readable format
    this.setState({ visualizationData: mergedData });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Container>
          <StatusBar style="auto" />
          <TitleContainer>
            <Title>Profil</Title>
            <TouchableIcon onPress={this.fetchData}>
              <MaterialCommunityIcons name="reload" size={40} color="#1063a9" />
            </TouchableIcon>
          </TitleContainer>
          <ContentContainer>
            <CardWrapper>
              <Text>
                Hier findest du die Ergebnisse deiner letzten Fragebögen
                grafisch aufbereitet
              </Text>
            </CardWrapper>
            {this.state.visualizationData != null ? (
              <GraphContainer>
                {/* <GraphTitle>
                  Hallo
                </GraphTitle> */}
                <InnerGraphContainer
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <LineGraph
                    data={{
                      datasets: this.state.visualizationData.datasets,
                      labels: this.state.visualizationData.labels,
                    }}
                  />
                </InnerGraphContainer>
                <LabelContainer>
                  {this.state.visualizationData.legend.map((value, index) => {
                    return (
                      <InnerLabelContainer key={index}>
                        <Label
                          labelColor={
                            this.state.visualizationData.datasets[index].color
                          }
                        ></Label>
                        <LabelText>{value}</LabelText>
                      </InnerLabelContainer>
                    );
                  })}
                </LabelContainer>
              </GraphContainer>
            ) : (
              <TextError>Keine Daten gefunden</TextError>
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
  padding-left: 15px;
  padding-right: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  z-index: 1;
  background-color: white;
`;

const Title = styled.Text`
  font-size: 35px;
  color: #1063a9;
`;

const TouchableIcon = styled.TouchableOpacity``

const ContentContainer = styled.ScrollView``;

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

const InnerGraphContainer = styled.ScrollView`
  overflow: visible;
`;

const LabelContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin-bottom: 5px;
`;

const InnerLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Label = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => props.labelColor};
`;

const LabelText = styled.Text`
  padding-right: 30px;
`;

const TextError = styled.Text`
  text-align: center;
  font-size: 17px;
  margin-top: 10px;
  color: red;
`;
