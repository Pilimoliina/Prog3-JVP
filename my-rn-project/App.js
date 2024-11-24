import { StyleSheet, Text, View } from "react-native-web";
import { NavigationContainer } from "@react-navigation/native";
import NavegacionPrincipal from "./src/navigation/NavegacionPrincipal";
import NavegacionAnidada from "./src/navigation/NavegacionAnidada";
export default function App() {
  return (
    
      <NavigationContainer>

        <NavegacionPrincipal/> 
  
      </NavigationContainer>
    

  );
}

