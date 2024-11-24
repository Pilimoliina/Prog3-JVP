import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { auth, db } from "../firebase/config"
import Post from '../components/Post'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [] // Array para almacenar los posts con toda la información
    }
  }

  componentDidMount() {
    // Verificación de usuario logueado
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        this.props.navigation.navigate('login')
      }
    });

    auth.onAuthStateChanged((user) => {
      if (user !== null) {
        db.collection("posts")
          .orderBy("createdAt", "desc")
          .onSnapshot((docs) => {
            let postsObtenidos = []
            docs.forEach((doc) => {
              postsObtenidos.push({
                id: doc.id,
                data: doc.data() // Almacenamos todos los datos del post, incluyendo la descripción
              })
            })
            this.setState({
              posts: postsObtenidos
            })
          })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.postsTitle}>Home</Text>
        <View style={styles.flatlist}>
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) =>
              <Post
                navigation={this.props.navigation}
                post={item} // Pasamos el post entero con la descripción incluida
              />
            }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flatlist: {
    width: "100%",
    flex: 2,
   
  },
  container: {
    flex: 2,
    backgroundColor: '#ecf0f1', // Fondo general de la app
    paddingHorizontal: 15, // Espacio horizontal para la vista completa
    
  },
  postsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 5,
    marginVertical: 15,
    textAlign: 'center', // Centra el título de los posts
  },

});



