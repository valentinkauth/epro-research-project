import React from "react";
import styled from "styled-components";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

// TODO: Based on question type, render specific content and pass question and callback to child component
const QuestionCard = (props) => {
  var radio_props = [];

  props.answerOption.forEach((option) => {
    var label = option.valueCoding.display
      ? option.valueCoding.code + " - " + option.valueCoding.display
      : option.valueCoding.code;
    var value = option.valueCoding.code;
    radio_props.push({ label: label, value: value });
  });

  return (
    <Container>
      <QuestionText>{props.title}</QuestionText>
      <RadioForm
        radio_props={radio_props}
        initial={-1}
        // formHorizontal={true}
        // labelHorizontal={false}
        onPress={(value) => {
          props.callBack(props.linkId, getCode(props, value));
        }}
      />
    </Container>
  );
};

export default QuestionCard;

// Get response object
getCode = (props, value) => {
  var valueObject = {};
  props.answerOption.forEach((option) => {
    if (option.valueCoding.code == value) {
      valueObject = option;
    }
  });
  return valueObject;
};

const Container = styled.View`
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
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
