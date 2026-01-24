import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";

export default function WelcomeScreen() {

  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

  return (
    <View style={style.mainContainer}>
      <ImageBackground 
        source={require("@/assets/app_images/passanger.png")} 
        style={style.background}
        resizeMode="cover"
      >
        <View style={style.container}>
          
          <View style={style.textGroup}>
            <Text style={style.title}>Viajar juntos é mais leve.</Text>
            <Text style={style.subtitle}>
              Conectamos motoristas e passageiros que vão para o mesmo destino rápido, seguro e económico.
            </Text>
          </View>

          <View style={style.buttonGroup}>
            <Button text="Criar conta" isLoading={false} isPrimary onPress={() => navigate.navigate("signup")} halfWidth/>
            <Button text="Entrar" isLoading={false} isPrimary={false} onPress={() => navigate.replace("signin", {phone: "944996909"})} halfWidth/>
          </View>

        </View>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingTop: 20,
  },
  textGroup: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  }
});