import React from "react";
import styled from "styled-components";

const CardWrapper = (props) => {
  return <CardContainer>{props.children}</CardContainer>;
};
export default CardWrapper;

const CardContainer = styled.View`
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  shadow-opacity: 0.5;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 0px 0px;
`;
