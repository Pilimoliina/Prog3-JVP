import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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
        this.props.navigation.navigate('login');
      })
      .catch(error => console.error('Error al cerrar sesión:', error));
  }

  borrarPosteo(id) {
    console.log('Intentando eliminar post con ID:', id); // Debugging
    db.collection('posts').doc(id).delete()
      .then(() => {
        console.log('Posteo eliminado:', id);
        this.setState((prevState) => ({
          posts: prevState.posts.filter(post => post.id !== id),
        }));
      })
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
      .where('owner', '==', userEmail)
      .orderBy('createdAt', "desc")
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
    backgroundColor: '#f0f4f8',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 10,
    textAlign: 'center',
  },
  post: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#bdc3c7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  postText: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e74c3c',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
