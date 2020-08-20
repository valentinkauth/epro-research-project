import React from "react";
import styled from "styled-components";

// TODO: Based on question type, render specific content and pass question and callback to child component
const ButtonBottom = (props) => {
  return (
    <CustomButton onPress={props.handleClick} disabled={props.disabled}>
      <CustomButtonText>Fragebogen senden</CustomButtonText>
    </CustomButton>
  );
};

const CustomButton = styled.TouchableOpacity`
  opacity: ${(props) => (props.disabled ? "0.4" : "1.0")};
  background-color: #1063a9;
  height: 40px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const CustomButtonText = styled.Text`
  font-size: 20px;
  color: white;
`;

export default ButtonBottom;
