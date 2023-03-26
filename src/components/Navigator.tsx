import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screen/sign-in/Login';
import SignUp from '../screen/sign-in/SignUp';
import { Icon } from 'react-native-elements';

import Home from '../screen/home/Home';
import Chat from '../screen/chat/Chat';
import MyCardStack from '../screen/my-card-stacks/MyCardStack';
import { COLOR_LEMONADE } from '../constants/Color';

const rootStack = createNativeStackNavigator<RootStackParams>();
export const Navigator = (props: {initialRouteName: "SignIn"|"Tab"})=> (
  <NavigationContainer>
    <rootStack.Navigator
      initialRouteName={props.initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <rootStack.Screen name="SignIn" component={SignIn} />
      <rootStack.Screen name="Tab" component={Router} />
    </rootStack.Navigator>
  </NavigationContainer>
)

const signInStack = createNativeStackNavigator<SignInStackParams>();
export const SignIn = () => {
  return (
    <signInStack.Navigator
      initialRouteName="LogIn"
      screenOptions={{
        headerStyle: { backgroundColor: '#82292D' },
        headerTitleStyle: { color: '#ffffff', fontSize: 30 },
        headerTintColor: '#ffffff',
        title: 'さぽえも',
        headerTitleAlign: 'center',
      }}
    >
      <signInStack.Screen name="LogIn" component={Login} />
      <signInStack.Screen name="SignUp" component={SignUp} />
    </signInStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<TabStackParams>();
export const Router = () => {
  return (
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
        component={MyCardStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Icon name="image" type="feather" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
