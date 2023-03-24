import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/sign-in/Login';
import SignUp from '../screen/sign-in/SignUp';
import { Icon } from 'react-native-elements';

import Home from '../screen/home/Home';
import Chat from '../screen/chat/Chat';
import TakePicture from '../screen/my-card-stacks/TakePicture';
import { COLOR_LEMONADE } from '../constants/Color';

const signInStack = createNativeStackNavigator();
export const SignIn = () => {
  return (
    <NavigationContainer>
      <signInStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#82292D' },
          headerTitleStyle: { color: '#ffffff', fontSize: 30 },
          headerTintColor: '#ffffff',
          title: 'さぽえも',
          headerTitleAlign: 'center',
        }}
      >
        <signInStack.Screen name="Login" component={Login} />
        <signInStack.Screen name="SignUp" component={SignUp} />
      </signInStack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();
export const Router = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveBackgroundColor: COLOR_LEMONADE,
          tabBarInactiveBackgroundColor: COLOR_LEMONADE,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="home" type="feather" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="message-square" type="feather" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="MyCardsStack"
          component={TakePicture}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="image" type="feather" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
