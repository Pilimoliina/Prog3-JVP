import { NavigationContainer } from "@react-navigation/native";
import NavegacionPrincipal from "./src/navigation/NavegacionPrincipal";
import Imagen from "./src/components/Imagen";
export default function App() {
  return (
    
      <NavigationContainer>
        <Imagen />
        <NavegacionPrincipal/> 
  
      </NavigationContainer>
    

  );
}






