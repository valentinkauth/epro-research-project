import React from "react";
import { StyleSheet, Text, View, Button, ScrollView, SafeAreaView } from "react-native";
import * as APIHelper from "../helpers/fhir-api";

class QuestionnaireScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Helloooo" };
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text>{this.state.text}</Text>
        </ScrollView>

        <Button
          onPress={this.buttonClicked}
          title="Get Questionnaire data"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </SafeAreaView>
    );
  }

  buttonClicked = async () => {
    console.log("Questionnaire Button clicked");
    let data = await APIHelper.loadData();
    this.setState({ text: data });
  };
}

export default QuestionnaireScreen;
