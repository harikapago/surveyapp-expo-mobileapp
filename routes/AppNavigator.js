import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Welcome from "../Screens/Survey/Welcome";

import Thank from "../Screens/Survey/Thank";
import SignIn from "../Screens/Auth/SignIn";
import Footer from "../Screens/Components/Footer";

import Questions from "../Screens/Survey/Questions";
import Login from "../Screens/Auth/Login";
import Register from "../Screens/Auth/Register";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Survey" component={Questions} />
        <Stack.Screen name="ThankYou" component={Thank} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
};

export default AppNavigator;
