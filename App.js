import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as APIHelper from "./helpers/fhir-api";
import QuestionnaireScreen from "./components/QuestionnaireScreen";

// https://github.com/jmandel/sdc-fhir-demo
// https://github.com/Vermonster/fhir-kit-client
// https://github.com/smart-on-fhir/client-js

export default function App() {
  state = {
    data: "Click the button and see what happens!",
  };
  return (
    <View style={styles.container}>
      <QuestionnaireScreen></QuestionnaireScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
