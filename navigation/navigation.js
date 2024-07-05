import React from 'react';
import SignUpScreen from "../screens/signeUp";
import SignInScreen from "../screens/signeIn";
import NavigationTodo from "./NavigationTodo"
import HomeScreen from "../screens/homeScreen";
import SignOutScreen from "../screens/SignOutScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TokenContext } from '../Contexte/Context'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <NavigationContainer>
          {token == null ? (
            <Stack.Navigator initialRouteName='SignIn'>
              <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUpScreen}></Stack.Screen>
            </Stack.Navigator>
          ) : (
            <Tab.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
              <Stack.Screen name='TodoLists' component={NavigationTodo}></Stack.Screen>
              <Stack.Screen name='SignOut' component={SignOutScreen} ></Stack.Screen>
            </Tab.Navigator>
          )}
        </NavigationContainer>
      )}
    </TokenContext.Consumer>
  )
}