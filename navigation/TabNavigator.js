import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import QuestionnaireOverviewScreen from "../screens/QuestionnaireOverviewScreen";

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    mode: "modal",
  }
);

ProfileStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  return {
    tabBarVisible,
    tabBarLabel: "Profil",
    tabBarIcon: ({ tintColor }) => (
      <AntDesign name="user" size={24} color={tintColor} />
    ),
    tabBarOptions: { activeTintColor: "#1063a9" },
  };
};

const QuestionnaireStack = createStackNavigator(
  {
    QuestionnaireOverview: {
      screen: QuestionnaireOverviewScreen,
      navigationOptions: { headerShown: false },
    },
    Questionnaire: {
      screen: QuestionnaireScreen,
      navigationOptions: { headerShown: false },
    },
  },
  {
    mode: "modal",
  }
);

QuestionnaireStack.navigationOptions = ({ navigation }) => {
  var tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Questionnaire") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Fragebogen",
    tabBarIcon: ({ tintColor }) => (
      <Entypo name="text-document" size={24} color={tintColor} />
    ),
    tabBarOptions: { activeTintColor: "#1063a9" },
  };
};

const TabNavigator = createBottomTabNavigator({
  QuestionnaireStack,
  ProfileStack,
});

export default createAppContainer(TabNavigator);
