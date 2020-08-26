import React, { useState } from "react";
import styled from "styled-components";
import { KeyboardAvoidingView, Switch, TextInput } from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

// TODO: Based on question type, render specific content and pass question and callback to child component
const QuestionCard = (props) => {
  // Set state for boolean toogle
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  // Set state for text input
  const [value, onChangeText] = React.useState("");

  // Create empty question card content variable
  var questionCardContent = "";

  // Fill content based on question type
  switch (props.type) {
    case "choice":
      // Create properties for radio form
      var radio_props = [];
      props.answerOption.forEach((option) => {
        var label = option.valueCoding.display
          ? option.valueCoding.code + " - " + option.valueCoding.display
          : option.valueCoding.code;
        var value = option.valueCoding.code;
        radio_props.push({ label: label, value: value });
      });
      questionCardContent = (
        <RadioForm
          radio_props={radio_props}
          initial={-1}
          // formHorizontal={true}
          // labelHorizontal={false}
          onPress={(value) => {
            props.callBack(props.linkId, getValueCoding(props, value));
          }}
        />
      );
      break;
    case "boolean":
      questionCardContent = (
        <RadioForm
          radio_props={[{label: "Ja", value: true}, {label: "Nein", value: false}]}
          initial={-1}
          // formHorizontal={true}
          // labelHorizontal={true}
          onPress={(value) => {
            props.callBack(props.linkId, getValueBoolean(value));
          }}
        />
        // <Switch
        //   trackColor={{ false: "#767577", true: "#81b0ff" }}
        //   ios_backgroundColor="#3e3e3e"
        //   onValueChange={(value) => {
        //     console.log(value);
        //     toggleSwitch();
        //     props.callBack(props.linkId, getValueBoolean(value));
        //   }}
        //   value={isEnabled}
        // />
      );
      break;
    case "string":
      questionCardContent = (
        <TextInput
          style={{
            height: 80,
            borderColor: "gray",
            borderWidth: 1,
            width: "90%",
          }}
          onChangeText={(text) => {
            onChangeText(text);
            props.callBack(props.linkId, getValueString(text));
          }}
          value={value}
        />
      );
      break;
    default:
      questionCardContent = (
        <QuestionText>
          Für den Fragetyp {props.type} gibt es derzeit noch kein Eingabefeld
        </QuestionText>
      );
      break;
  }

  return (
    <Container>
      <QuestionText>{props.title}</QuestionText>
      {questionCardContent}
    </Container>
  );
};

export default QuestionCard;

// Get response object of type valueCoding
getValueCoding = (props, value) => {
  var valueObject = {};
  props.answerOption.forEach((option) => {
    if (option.valueCoding.code == value) {
      valueObject = option;
    }
  });
  return valueObject;
};

// Get response object of type valueBoolean
getValueBoolean = (booleanValue) => {
  return { valueBoolean: booleanValue };
};

// Get response object of type valueString
getValueString = (stringValue) => {
  return { valueString: stringValue };
};

const Container = styled.KeyboardAvoidingView`
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-color: #1063a9;
  border-width: 1px;
  margin-bottom: 20px;
`;

const QuestionText = styled.Text`
  text-align: center;
  font-size: ${(props) => (props.type == "info" ? "35px" : "17px")};
  color: ${(props) => (props.type == "info" ? "#1063a9" : "black")};
  margin-bottom: 15px;
`;

const DescriptionText = styled.Text`
  text-align: center;
  font-size: 17px;
  margin-top: 15px;
  color: black;
`;
