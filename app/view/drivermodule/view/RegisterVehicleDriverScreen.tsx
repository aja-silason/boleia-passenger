import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useRegisterVehicle } from "../infra/hooks/vehicle/useRegisterVehicle";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";
import { LoadingModal } from "./components/modal/LoadingModal";
import { Modal } from "./components/modal/Modal";

export default function RegisterVehicleDriverScreen() {
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const backAction = () => {
            if(navigate.canGoBack()) {
                navigate.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigate]);

  const route = useRoute<RouteProp<RootStackParamList, "registervehicle">>();

  const {isLoading, handleChange, handleSubmit} = useRegisterVehicle(route?.params.phone);

  const successRef = useRef<Modalize>(null);
    
    const openModalConfirm = async () => {
        Keyboard.dismiss()
      const res = await handleSubmit()
      if(res){
        setTimeout(() => {
            return successRef.current?.open();
        }, 100)
      }
}

  
     return (
            <KeyboardAvoidingView 
                style={[styles.mainContent, { flex: 1, backgroundColor: Colors.whiteBackground }]}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
            <LoadingModal visible={isLoading}/>
             <View style={styles.container}>
                 <HeaderBack title="Dados do veículo" description="Informe dados do carro que vai usar para oferecer boleias."/>
                 
                 <View style={styles.carinfo}>
                    <Input onChange={(value) => handleChange("brand", value)} placeholder="Boleia Mobil" title="Marca" isHalf/>
                    <Input onChange={(value) => handleChange("model", value)} placeholder="TXR" title="Modelo" isHalf/>
                 </View>

                 <View style={styles.carinfo}>
                    <Input onChange={(value) => handleChange("seriesYear", value)} placeholder="2022" title="Ano" isHalf/>
                    <Input onChange={(value) => handleChange("color", value)} placeholder="Preto" title="Cor" isHalf/>
                 </View>

                <View style={styles.carinfo}>
                    <Input onChange={(value) => handleChange("plate", value)} placeholder="LD-15-13-XPTO" title="Matricula" isHalf/>
                    <Input onChange={(value) => handleChange("seats", value)} placeholder="Ninguem" title="Lugares" isHalf/>
                 </View>

                <View style={{paddingTop: 20}}>
                    <Button isLoading={isLoading} onPress={openModalConfirm} text="Continuar" isPrimary/>
                </View>
 
             </View>

            <Modal height={250} maxHeight={250} ref={successRef} component={
                <View style={styles.modalContent}>
                    <Ionicons name="checkmark-circle" color="green" size={50} />
                    <Text style={styles.modalTitle}>Cadastro enviado com sucesso!</Text>
                    <Text style={styles.modalDescription}>Estamos a validar suas informações. Tão logo for aprovado, você estará habilitado a oferecer BOLEIA.</Text>
                    <Button isLoading={false} onPress={() => navigate.navigate("typepassword", {phoneNumber: route?.params.phone})} text="OK" isPrimary/>
                </View>
            }/>
         </KeyboardAvoidingView>
     )
 }
 
 const styles = StyleSheet.create({
     mainContent: {
         flex: 1
     }, 
     container: {
         paddingHorizontal: 20,
         paddingVertical: 40,
         gap: 5
     },
     link: {
         alignItems: "flex-end",
         paddingTop: 10,
         paddingBottom: 30
     },
     carinfo: {
        flexDirection: "row",
        justifyContent: "space-between"
     },
     modalContent: {
             justifyContent: "center",
             alignItems: "center",
             paddingHorizontal: 10,
             flex: 1,
             height: 200,
             gap: 5,
             textAlign: "center"
         },
         modalTitle: {
             color: Colors.background,
             fontWeight: "600",
             fontSize: 16,
             textAlign: "center"
         },
         modalDescription: {
             color: Colors.placeHolder,
             textAlign: "center"
         },
 })