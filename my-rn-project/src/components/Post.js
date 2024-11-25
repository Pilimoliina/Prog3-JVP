import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config"
import firebase from "firebase"
import Icon from 'react-native-vector-icons/FontAwesome';



export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      estaMiLike: false,
      likesCount: this.props.post.data.likes.length,
      descripcion: this.props.post.data.descripcion // Aquí obtenemos la descripción directamente
    }
  }

  componentDidMount() {
    this.setState({
      estaMiLike: this.props.post.data.likes.includes(auth.currentUser.email),
    })
  }

  like() {
    db.collection("posts").doc(this.props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
      })
      .then(() => {
        this.setState(prevState => ({
          estaMiLike: true,
          likesCount: prevState.likesCount + 1,
        }));
      })
      .catch((err) => console.log(err))
  }

  unlike() {
    db.collection("posts").doc(this.props.post.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
      })
      .then(() => {
        this.setState(prevState => ({
          estaMiLike: false,
          likesCount: prevState.likesCount - 1,
        }));
      })
      .catch((err) => console.log(err))
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

        {
          estaMiLike ?
            <TouchableOpacity onPress={() => this.unlike()}>
              <Text style={styles.textLikes} ><Icon name="heart" size={15} color="#3498db" />  {likesCount} me gusta</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => this.like()}>
              <Text style={styles.textLikes}> <Icon name="heart-o" size={15} color="#3498db" />  {likesCount} me gusta</Text>
            </TouchableOpacity>
        }

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
  textLikes: {
    color: '#3498db', 
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: 2,
    flex: 1,
    justifyContent: 'flex-end',
  }

});
