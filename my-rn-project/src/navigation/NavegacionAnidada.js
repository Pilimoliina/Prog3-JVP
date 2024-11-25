import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import Profile from '../screens/Profile'
import CrearPost from '../screens/CrearPosteo'
import Home from '../screens/Home'
import BuscadorUsers from '../screens/BuscadorUsers';

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
          name='Perfil' 
          component={Profile}  
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="user-circle" size={24} color="black" /> // Ícono para el perfil
          }}
      />
      <Tab.Screen 
          name='Buscador' 
          component={BuscadorUsers}  
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> // Ícono de lupa para el buscador
          }}
      />
        <Tab.Screen
          name='Crear posteo' 
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
