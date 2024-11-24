import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"


export default class CrearPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      descripcion: "",
    }
  }

  onSubmit(descripcion) {
    if (descripcion !== "") {
      db.collection("posts").add({
        descripcion: descripcion,
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        likes: []
      })
        .then((resp) => {
          console.log('Posteo Hecho');
          this.props.navigation.navigate('Home')
          this.setState({
            descripcion: "",
          })
        }
        )
        .catch((err) => console.log(err))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
            <>
              <Text style={styles.title}>New Post</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({ descripcion: text })}
                placeholder='Descripción del posteo'
              />
              <TouchableOpacity
                onPress={() => this.onSubmit(this.state.descripcion)}
              >
                <Text style={styles.whiteText}>Crear posteo</Text>
              </TouchableOpacity>
            </>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f0f4f8', // Fondo suave azul grisáceo
    },
    title: {
      fontSize: 36, // Título destacado y grande
      fontWeight: 'bold',
      letterSpacing: 2, // Espaciado entre letras
      marginBottom: 40, // Más espacio debajo del título
      color: '#2c3e50', // Azul oscuro
      textAlign: 'center',
    },
    textInput: {
      width: '90%', // Ajuste para que ocupe la mayor parte de la pantalla
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc', // Color de borde suave
      marginBottom: 20,
      paddingHorizontal: 15,
      borderRadius: 12, // Bordes redondeados
      color: '#2c3e50', // Texto oscuro
      backgroundColor: '#fff', // Fondo blanco
      fontSize: 18, // Texto más grande
      letterSpacing: 1, // Espaciado entre letras
    },
    btnCrearPost: {
      backgroundColor: '#3498db', // Azul vibrante
      padding: 15,
      borderRadius: 12,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // Sombra para Android
      width: '90%', // Botón ancho proporcional al input
      alignItems: 'center',
    },
    textBtnCrearPost: {
      fontSize: 20, // Texto más grande
      color: '#', // Texto blanco
      fontWeight: 'bold',
      letterSpacing: 1, // Espaciado entre letras
    },
    whiteText: {
      fontSize: 20, // Texto blanco grande
      color: '#4d90fe', // Texto blanco
      fontWeight: 'bold',
      letterSpacing: 1, // Espaciado adicional
      textAlign: 'center',
    },
  });
  