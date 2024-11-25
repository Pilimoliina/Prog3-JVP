import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { auth } from '../firebase/config';


export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posts: [],
    };
  }

  componentDidMount() {
    // Verificación de usuario logueado
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario está logueado, redirige a 'Home'
        this.props.navigation.navigate('anidada');
      } else {
        // Si no está logueado, redirige a 'menu'
        this.props.navigation.navigate('menu');
      }
    });
  }
  Register() {
        this.props.navigation.navigate('register'); // Navegar a login después de cerrar sesión
  }

  Login() {
    this.props.navigation.navigate('login'); // Navegar a login después de cerrar sesión
    }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.title}>¡Bienvenido a JVP!</Text>
        <Text style={style.subTitle}>¿Hacia donde te quieres dirigir?</Text>
       <TouchableOpacity
          onPress={() => this.Login()}
          style={style.boton}
        >
          <Text style={style.textoBoton}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.Register()}
          style={style.boton2}
        >
          <Text style={style.textoBoton}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
    boton: {
        backgroundColor: '#6495ED', // Azul pastel para el botón
        justifyContent: 'center', // Centrado vertical del texto en el botón
        alignItems: 'center', // Centrado horizontal del texto en el botón
        paddingVertical: 12, // Altura del botón
        borderRadius: 8, // Bordes redondeados en el botón
        width: '70%', // Mismo ancho para el botón
        height: 50, // Mismo alto para el botón
        marginBottom: 15, // Espacio inferior
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 2 }, // Dirección de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        elevation: 5, // Elevación para dispositivos Android
        alignSelf: 'center',
        marginTop: 20
    },
    boton2: {
        backgroundColor: "#3B67C4", // Azul oscuro para el segundo botón
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center', // Centrado horizontal
        paddingVertical: 12,
        borderRadius: 8,
        width: '70%',
        height: 50,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
        alignSelf: 'center'
    },
    textoBoton: {
        color: 'white', // Texto blanco
        fontWeight: 'bold',
        fontSize: 16,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#333',
      textAlign: 'center',
      marginTop: 250
    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
        marginTop: 10
    }
})