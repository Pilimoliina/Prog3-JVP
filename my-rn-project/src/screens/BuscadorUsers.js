import { Text, View , FlatList, TouchableOpacity, TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import React, { Component } from 'react'
import { db } from '../firebase/config'

export default class BuscadorUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      filteredUsers: [],
      searchText: '',
    }
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let arrDocs = [];
      docs.forEach((doc) => {
        arrDocs.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        users: arrDocs,
        filteredUsers: arrDocs, // Inicialmente todos los usuarios
      });
    });
  }

  filtrado(text) {
    const filtered = this.state.users.filter((user) => {
      return user.data.name && 
             user.data.name.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({
      searchText: text,       // guardo el texto escrito
      filteredUsers: filtered, // muestro solo los usuarios filtrados
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Buscador de usuarios</Text>
        <TextInput
          style={styles.search}
          placeholder="Ingrese el usuario..."
          value={this.state.searchText}
          onChangeText={(text) => this.filtrado(text)}
        /> 
        <View style={styles.flatList}>
        <FlatList 
          data={this.state.filteredUsers.length > 0 
            ? this.state.filteredUsers 
            : [{ id: 'no hay usuario', data: { name: "El usuario no existe" } }]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text style={styles.userCard}> {item.data.name} </Text>}
        />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Fondo azul claro (celeste)
    padding: 15,
    alignItems: 'center',
    width:"100%"
  },
  flatList: {
    width: "100%",
    flex: 2,
  },
  search: {
    maxHeight: 40, 
    minHeight:40,
    width: '50%', // Ajustado para mayor uso del espacio
    borderWidth: 1,
    borderStyle:"dashed",
    borderColor: '#3498db', // Borde azul celeste
    borderRadius: 12, // Bordes redondeados
    backgroundColor: '#fff', // Fondo blanco para el campo de búsqueda
    paddingHorizontal: 6,
    marginVertical: 20,
    fontSize: 16, 
    color: 'black', // Texto negro para buen contraste
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
    textAlign:"center"
 

  },
  texto: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#333', // Texto negro
    marginBottom: 20,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff', 
    padding: 20, 
    marginBottom: 10, 
    borderRadius: 12, // Bordes redondeados
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    fontSize: 18, // Texto ligeramente mayor
    color: '#333', // Texto negro para asegurar buena legibilidad
    width:"40%",
    textAlign:"center",
    alignSelf:"center"
    
  },
});