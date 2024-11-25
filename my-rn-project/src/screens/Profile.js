import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      posts: [],
    };
  }

  cerrarSesion() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('menu'); // Navegar al menu después de cerrar sesión
      })
      .catch(error => console.error('Error al cerrar sesión:', error));
  }

  borrarPosteo(id) {
    db.collection('posts').doc(id).delete()
      .then(() => console.log('Posteo eliminado:', id))
      .catch(err => console.error('Error eliminando el posteo:', err));
  }

  componentDidMount() {
    const userEmail = auth.currentUser?.email;
    if (!userEmail) {
      console.log('No hay un usuario autenticado.');
      return;
    }

    // Cargar información del usuario
    db.collection('users')
      .where('owner', '==', userEmail)
      .onSnapshot(
        docs => {
          let arrDocs = [];
          docs.forEach(doc => arrDocs.push({ id: doc.id, data: doc.data() }));
          this.setState({ userInfo: arrDocs });
        },
        error => console.log('Error cargando usuario:', error)
      );

    // Cargar posteos del usuario
    db.collection('posts')
      .orderBy('createdAt', "desc")
      .where('owner', '==', userEmail)
      .onSnapshot(
        snapshot => {
          const posteos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.setState({ posts: posteos });
        },
        error => console.log('Error cargando posteos:', error)
      );
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.titulo}>Mi perfil</Text>
        <Text style={style.info}>
          {this.state.userInfo.length > 0 ? `Usuario: ${this.state.userInfo[0].data.name}` : 'Cargando...'}
        </Text>
        <Text style={style.info}>
          {this.state.userInfo.length > 0 ? `Email: ${this.state.userInfo[0].data.owner}` : 'Cargando...'}
        </Text>
        <Text style={style.info}>
          Mis posteos: {this.state.posts.length >= 0 ? this.state.posts.length : 'Cargando...'}
        </Text>

        <View style={style.flatlist}>
        <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={style.post}>
              <Text style={style.postText}>{item.descripcion}</Text>
              <TouchableOpacity
                onPress={() => this.borrarPosteo(item.id)}
                style={style.deleteButton}
              >
                <Text style={style.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        </View>

        <TouchableOpacity
          onPress={() => this.cerrarSesion()}
          style={style.boton}
        >
          <Text style={style.textoBoton}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8', // Fondo claro
  },
  flatlist: {
    width: "100%",
    flex: 2,
    justifyContent:'center'
  },
  titulo: {
    fontSize: 36, // Título destacado y grande
    fontWeight: 'bold',
    letterSpacing: 2, // Espaciado entre letras
    marginBottom: 40, // Más espacio debajo del título
    color: '#2c3e50', // Azul oscuro
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#34495e', // Color gris
    marginBottom: 10,
    textAlign: 'center',
  },
  // Estilos para cada posteo
  post: {
    backgroundColor: 'white', // Fondo suave para cada post
    padding: 40,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 8,
    width: '20%',
    shadowColor: '#bdc3c7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Sombra para dispositivos Android
    borderWidth: 1, 
    borderColor: '#000', 
    alignItems:"center",
    alignSelf: 'center'
  },
  postText: {
    fontSize: 16,
    color: '#2c3e50', // Texto oscuro
    marginBottom: 10,
  },
  postDate: {
    fontSize: 12,
    color: '#95a5a6', // Color gris claro para la fecha
    marginBottom: 10,
  },
  // Estilo para el botón de eliminar
  deleteButton: {
    backgroundColor: 'transparent', // Sin fondo
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center', // Centrado
    borderWidth: 1, // Borde del botón
    borderColor: '#e74c3c', // Borde rojo
    marginTop: 20
  },
  deleteButtonText: {
    color: '#e74c3c', // Letras rojas
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  textoBoton: {
    fontSize: 23, // Texto blanco grande
    color: '#4d90fe', // Texto blanco
    fontWeight: 'bold',
    letterSpacing: 1, // Espaciado adicional
    textAlign: 'center',
  },
});
