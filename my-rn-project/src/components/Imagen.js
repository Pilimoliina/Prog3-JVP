import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Imagen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source= {require('../../assets/logoJVP.png')}
        style={styles.image} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 10, 
      left: 10, 
      zIndex: 1, 
    },
    image: {
      width: 50, 
      height: 50,
      borderRadius: 25,
      backgroundColor: 'gray', 
      resizeMode: 'cover', 
    },
  });
  
  

export default Imagen;