import React from "react";
import { getAuth } from 'firebase/auth';
import { View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";

const signInStack = createNativeStackNavigator();
export const SignIn = () => {
  return (
    <signInStack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerStyle: { backgroundColor: '#82292D' },
        headerTitleStyle: { color: '#ffffff', fontSize: 30 },
        headerTintColor: '#ffffff',
        title: 'さぽえも',
        headerTitleAlign: 'center'
      }}
    >
      <signInStack.Screen
        name="Login"
        component={Login}
      />
      <signInStack.Screen
        name="SignUp"
        component={SignUp}
      />
    </signInStack.Navigator>
  )
}

export const Router = () => {
  return (
    <View></View>
  )

}