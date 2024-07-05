import React from 'react';
import TodoListsScreen from '../screens/TodoListsScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import todoItemScreen from '../screens/todoItemScreen';

const Stack = createNativeStackNavigator();
export default function NavigationTodo() {
   return (
      <Stack.Navigator initialRouteName='ListModuleScreen'>
         <Stack.Screen name='ListModuleScreen' component={TodoListsScreen}></Stack.Screen>
         <Stack.Screen name='TasksScreen' component={todoItemScreen}></Stack.Screen>
      </Stack.Navigator>
   )
}