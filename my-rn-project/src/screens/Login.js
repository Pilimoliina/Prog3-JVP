import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',      // Almacena el email ingresado por el usuario
            password: '',   // Almacena la contraseña ingresada por el usuario
            error: '',      // Almacena el mensaje de error en caso de que la validación falle
        }
    }

    // Verificar si el usuario ya está logueado
    componentDidMount() {
        // El método onAuthStateChanged escucha el estado de autenticación del usuario
        auth.onAuthStateChanged((user) => {
            if (user) {
                // Si el usuario está logueado, navega hacia la pantalla 'anidada'
                this.props.navigation.navigate('anidada')
                console.log('Mail del usuario logueado', auth.currentUser.email);
            }
        })
    }

    // Función para navegar a la pantalla de registro
    irARegister() {
        this.props.navigation.navigate('register')
    }

    // Función que se llama al enviar el formulario de inicio de sesión
    onSubmit() {
        const { email, password } = this.state;

        // Validar que el email contiene un '@' y la contraseña tenga al menos 6 caracteres
        if (email === '' || !email.includes('@')) {
            this.setState({ error: 'Por favor, ingresa un correo electrónico válido.' });
        } else if (password === '' || password.length < 6) {
            this.setState({ error: 'La contraseña debe tener al menos 6 caracteres.' });
        } else {
            // Si la validación es correcta, intentamos iniciar sesión con las credenciales proporcionadas
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Si el inicio de sesión es exitoso, navega hacia la pantalla 'anidada'
                    this.props.navigation.navigate('anidada');
                })
                .catch(err => {
                    // Si ocurre un error al intentar iniciar sesión, se muestra un mensaje de error
                    this.setState({
                        error: 'Error al ingresar sesión, verifica tus credenciales.',
                    });
                });
        }
    }

    render() {
        return (
            <View style={style.container}>
                <Text style={style.login}>Ingresar</Text>

                {/* Campo de texto para el email */}
                <TextInput
                    style={style.field}
                    keyboardType="email-address"  // Especificamos que el campo es para un email
                    placeholder="Ingresa tu email"  // Texto que aparece cuando el campo está vacío
                    onChangeText={(text) => this.setState({ email: text })}  // Actualiza el estado del email
                    value={this.state.email}  // Muestra el valor actual del email en el campo
                />

                {/* Campo de texto para la contraseña */}
                <TextInput
                    style={style.field}
                    keyboardType="default"
                    placeholder="Ingresa tu contraseña"
                    secureTextEntry={true}  // Hace que el texto sea oculto (para contraseñas)
                    onChangeText={(text) => this.setState({ password: text })}  // Actualiza el estado de la contraseña
                    value={this.state.password}  // Muestra el valor actual de la contraseña en el campo
                />

                {/* Mostrar mensaje de error si existe un error de validación */}
                {this.state.error !== '' && <Text style={style.errorText}>{this.state.error}</Text>}

                {/* Botón de inicio de sesión */}
                <TouchableOpacity onPress={() => this.onSubmit()} style={style.boton}>
                    <Text style={style.textoBoton}>Enviar</Text>
                </TouchableOpacity>

                {/* Botón para navegar al registro si no tienes cuenta */}
                <TouchableOpacity onPress={() => this.irARegister()} style={style.boton2}>
                    <Text style={style.textoBoton}>No tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Fondo claro
        justifyContent: 'center', // Centrado vertical
        alignItems: 'center', // Centrado horizontal
        padding: 20,
    },
    login: {
        fontWeight: 'bold',
        fontSize: 28, // Tamaño para el título
        color: '#333', // Gris oscuro
        textAlign: 'center',
        marginBottom: 20,
    },
    field: {
        backgroundColor: '#ffffff', // Blanco puro para los campos de entrada
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12, // Altura uniforme para los campos de entrada
        marginBottom: 15,
        borderRadius: 8,
        width: '70%', // Establecer el ancho de los campos de entrada
        height: 50, // Establecer la altura de los campos de entrada
        borderColor: '#ddd', // Color del borde de los campos
        borderWidth: 1, // Grosor del borde de los campos
        fontSize: 14,
    },
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
    },
    textoBoton: {
        color: 'white', // Texto blanco
        fontWeight: 'bold',
        fontSize: 16,
    },
    errorText: {
        color: 'red', // Color rojo para el texto de error
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
});