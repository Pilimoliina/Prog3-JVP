import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Profile from '../screens/Profile'
import CrearPost from '../screens/CrearPosteo'
import Home from '../screens/Home'

const Tab = createBottomTabNavigator();

export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen 
          name='Home' 
          component={Home} 
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
          }}
      />

        <Tab.Screen 
          name='profile' 
          component={Profile}  
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="user-circle" size={24} color="black" /> // Ícono para el perfil
          }}
      />
        
        <Tab.Screen
          name='crearPost' 
          component={CrearPost}
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="edit" size={24} color="black" />
          }} 
      />

      </Tab.Navigator>
    );
  }
}
