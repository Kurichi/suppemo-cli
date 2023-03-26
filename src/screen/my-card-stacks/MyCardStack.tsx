import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateCard from './CreateCard';
import EditCard from './EditCard';
import MyCardList from './MyCardList';
import MyCardMenu from './MyCardMenu';
import TakePicture from './TakePicture';

const Stack = createNativeStackNavigator<MyCardsStackParams>();
export default function  MyCardStack() {
  return (
    <Stack.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Menu' component={MyCardMenu} />
      <Stack.Screen name='Create' component={CreateCard} />
      <Stack.Screen name='Edit' component={EditCard} />
      <Stack.Screen name='CardList' component={MyCardList} />
      <Stack.Screen name='TakePicture' component={TakePicture} />
    </Stack.Navigator>
  )
}