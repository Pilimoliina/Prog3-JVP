import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Profile from '../screens/Profile'

const Tab = createBottomTabNavigator();

export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>

        <Tab.Screen 
          name='profile' 
          component={Profile}  
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="user-circle" size={24} color="black" /> // Ícono para el perfil
          }}
      />
      </Tab.Navigator>
    );
  }
}
