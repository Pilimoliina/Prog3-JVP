import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config"
import firebase from "firebase"


export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
     
      descripcion: this.props.post.data.descripcion // Aquí obtenemos la descripción directamente
    }
  }

  componentDidMount() {
    this.setState({
      estaMiLike: this.props.post.data.likes.includes(auth.currentUser.email),
    })
  }


  irAPerfil() {
    const { owner } = this.props.post.data;
    if (owner === auth.currentUser.email) {
      this.props.navigation.navigate('MyProfile');
    } 
  }

  render() {
    const { likesCount, estaMiLike, descripcion } = this.state;
    const { owner } = this.props.post.data;

    return (
      <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => this.irAPerfil()}>
          <Text style={styles.ownerText}>{owner}</Text>
        </TouchableOpacity>
        
        <Text style={styles.postDescription}>{descripcion}</Text> {/* Ahora se muestra la descripción correctamente */}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  postContainer: {
    width: '100%', // Asegura que el post ocupe todo el ancho disponible
    maxWidth: 300, // Limita el ancho máximo para un diseño más limpio
    backgroundColor: '#fff', // Fondo blanco para el post
    borderRadius: 10, // Bordes redondeados
    borderWidth: 1, // Borde delgado
    borderColor: '#0000FF', // Borde azul
    padding: 55, // Espacio interno en el post
    marginBottom: 10, // Separación entre posts
    alignItems: 'center', // Centra el contenido dentro del post
    justifyContent: 'center', // Asegura que el contenido se alinee en el centro
    alignSelf:"center",
  },
  postDescription: {
    fontSize: 14,
    color: '#000', // Texto negro para la descripción
    marginTop: 5, // Separación de la descripción
    textAlign: 'center', // Centra la descripción dentro del post
    paddingHorizontal: 10, // Espacio horizontal para que el texto no se quede pegado al borde
  },
  ownerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 0,
  },

});
