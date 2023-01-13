import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../screen/sign-in/Login";
import SignUp from "../screen/sign-in/SignUp";
import { Icon } from "react-native-elements";

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

const Tab = createBottomTabNavigator();
export const Router = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ }
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="home"
              type="feather"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ }
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="message-square"
              type="feather"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Tab.Screen
        name="MyCardsStack"
        component={ }
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon
              name="image"
              type="feather"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Tab.Navigator>
  )

}