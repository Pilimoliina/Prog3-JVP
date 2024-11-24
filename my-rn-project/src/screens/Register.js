import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { auth, db } from '../firebase/config'

class Register extends Component {
  constructor(props) {
    super(props);
    // Estado inicial del componente
    this.state = {
      email: '',            // Correo electrónico del usuario
      password: '',         // Contraseña del usuario
      name: '',             // Nombre del usuario
      minBio: '',           // Biografía corta del usuario
      loading: false,       // Estado de carga mientras se realiza el registro
      errorName: '',        // Error en el campo nombre
      errorPassword: '',    // Error en el campo contraseña
      errorMail: '',        // Error en el campo correo
      mailExiste: '',       // Error si el correo ya existe
      userRegistrado: false, // Si el usuario fue registrado correctamente
      userId: '',           // ID del usuario registrado
    };
  }

  componentDidMount() {
    // Comprobamos si ya hay un usuario autenticado
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario ya está autenticado, no lo dejamos registrarse
        this.props.navigation.navigate('login'); 
      }
    });
  }

  irALogin(){
    this.props.navigation.navigate('login')
  }

  // Método que maneja el envío del formulario
  onSubmit(email, password, name) {
    // Validaciones de los campos antes de registrar al usuario
    if (email === null || email === '' || email.includes('@') === false) {
      this.setState({
        errorMail: 'Verifica que el correo electrónico sea válido', 
        loading: false
      });
      return false;
    } 
    else if (password === null || password === '' || password.length < 6) {
      this.setState({
        errorPassword: 'La contraseña debe tener al menos 6 caracteres', 
        loading: false
      });
      return false;
    } 
    else if (name === null || name === '' ) {
      this.setState({
        errorName: 'Ingresa un nombre válido', 
        loading: false
      });
      return false;
    }

    // Si las validaciones pasan, iniciamos el proceso de registro
    this.setState({ loading: true, errorName: '', errorPassword: '', errorMail: '' });
    
    // Registro del usuario en Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('Usuario registrado exitosamente');
        this.setState({ userRegistrado: true });
        // Crear un documento en Firestore con los datos del usuario
        db.collection('users').add({
          owner: this.state.email,
          createdAt: Date.now(),
          name: this.state.name,
          minBio: this.state.minBio,
        })
        .then(() => {
          // Una vez creado el usuario y sus datos en Firestore, redirigimos al login
          this.setState({ loading: false });
          this.props.navigation.navigate("login", { email: this.state.email, password: this.state.password });
        })
        .catch((err) => {
          console.log('Error al crear documento en Firestore', err);
          this.setState({ loading: false });
        });
      })
      .catch((err) => {
        console.log('Error de registro', err);
        this.setState({ mailExiste: err.message, loading: false });
      });
  }

  // Método para renderizar la interfaz de usuario
  render() {
    return (
      <View style={styles.container}>
        {/* Título del formulario */}
        <Text style={styles.title}>Regístrate en nuestra página</Text>
        
        {/* Campo de entrada para el correo electrónico */}
        <TextInput
          style={styles.input}
          placeholder="Ingresar correo electrónico"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text, errorMail: '', mailExiste: '' })}
          value={this.state.email}
        />
        {/* Mostrar el mensaje de error si el correo no es válido */}
        {this.state.errorMail !== '' && 
          <Text style={styles.errorText}>{this.state.errorMail}</Text>
        }
        {this.state.mailExiste !== '' && 
          <Text style={styles.errorText}>{this.state.mailExiste}</Text>
        }

        {/* Campo de entrada para la contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Ingresa una contraseña"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text, errorPassword: '' })}
          value={this.state.password}
        />
        {/* Mostrar el mensaje de error si la contraseña no es válida */}
        {this.state.errorPassword !== '' && 
          <Text style={styles.errorText}>{this.state.errorPassword}</Text>
        }

        {/* Campo de entrada para el nombre de usuario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          onChangeText={(text) => this.setState({ name: text, errorName: '' })}
          value={this.state.name}
        />
        {/* Mostrar el mensaje de error si el nombre no es válido */}
        {this.state.errorName !== '' && 
          <Text style={styles.errorText}>{this.state.errorName}</Text>
        }

        {/* Campo de entrada para la minibio */}
        <TextInput
          style={styles.input}
          placeholder="Crea una bio"
          value={this.state.minBio}
          onChangeText={(text) => this.setState({ minBio: text })}
        />

        {/* Enlace para navegar al inicio de sesión si ya tienes cuenta */}
        <Text style={styles.textLink}>
          ¿Ya tienes una cuenta? 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.link}> Inicia sesión </Text>
          </TouchableOpacity>
        </Text>

        {/* Botón de registro */}
        {this.state.email === '' || this.state.password === '' || this.state.name === '' ? 
          '' : 
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.name) }
            disabled={this.state.loading}
          >
            {/* Si está cargando, muestra el indicador de carga */}
            {this.state.loading === true ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text style={styles.textBtn}>Registrarme</Text>
            )}
             
          </TouchableOpacity>
          

        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    width: '80%', // Hace el formulario más angosto al establecer el ancho al 80% del contenedor
  },
  btn: {
    backgroundColor: '#3B67C4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%', // Hace que el botón también sea más angosto
  },
  textBtn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 15,
  },
  link: {
    color: '#4d90fe',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Register;
