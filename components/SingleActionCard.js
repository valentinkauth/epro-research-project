import React from "react";
import styled from "styled-components/native";
import CardWrapper from "./CardWrapper";

// Props: text, buttonText, callBack
const SingleActionCard = (props) => (
  <CardWrapper>
    <Text>{props.text}</Text>
    <Button onPress={props.callBack}>
      <ButtonText>{props.buttonText}</ButtonText>
    </Button>
  </CardWrapper>
);

const Text = styled.Text`
  text-align: center;
  font-size: 17px;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1063a9;
  height: 35px;
  width: 90%;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  font-size: 17px;
  color: white;
`;

export default SingleActionCard;
