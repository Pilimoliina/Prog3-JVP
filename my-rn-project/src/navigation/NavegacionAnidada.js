import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import BuscadorUsers from '../screens/BuscadorUsers'


const Tab = createBottomTabNavigator()


export default class NavegacionAnidada extends Component {
  render() {
    return (
      <Tab.Navigator>

      <Tab.Screen 
          name='buscador' 
          component={BuscadorUsers}  
          options={{
              headerShown: false,
              tabBarIcon: () => <FontAwesome name="search" size={24} color="black" /> // Ícono de lupa para el buscador
          }}
      />

  </Tab.Navigator>
  
    )
  }
}