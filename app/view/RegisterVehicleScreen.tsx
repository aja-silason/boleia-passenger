import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { ConfirmUserInformationCard } from "./components/card/ConfirmUserInformationCard";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";
import { Modal } from "./components/modal/Modal";

export default function RegisterVehicleScreen() {
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute<RouteProp<RootStackParamList, "registervehicle">>();

  const [vehicleinfo, setVehicleinfo] = useState<any>();

  const modalizeRef = useRef<Modalize>(null);
  const successRef = useRef<Modalize>(null);

  const openModal = () => {
    return modalizeRef.current?.open();
  }

  const openModalConfirm = () => {
      return successRef.current?.open();
  }
  
     return (
         <View style={styles.mainContent}>
             <View style={styles.container}>
                 <HeaderBack title="Dados do veículo" description="Informe dados do carro que vai usar para oferecer boleias."/>
                 
                 <View style={styles.carinfo}>
                    <Input onChange={() => {}} placeholder="João" title="Marca" type="telephoneNumber" isHalf/>
                    <Input onChange={() => {}} placeholder="Ninguem" title="Modelo" type="telephoneNumber" isHalf/>
                 </View>

                 <View style={styles.carinfo}>
                    <Input onChange={() => {}} placeholder="João" title="Ano" type="telephoneNumber" isHalf/>
                    <Input onChange={() => {}} placeholder="Ninguem" title="Cor" type="telephoneNumber" isHalf/>
                 </View>

                <Input onChange={() => {}} placeholder="001234567LA890" title="Matrícula" type="telephoneNumber"/>

                <View style={{paddingTop: 20}}>
                    <Button isLoading onPress={openModal} text="Continuar" isPrimary/>
                </View>
 
             </View>

            <Modal height={350} maxHeight={350} ref={modalizeRef} component={
                <View style={styles.modalContent}>
                    <ConfirmUserInformationCard continue={openModalConfirm} redigite={() => navigate.goBack()} />
                </View>
            }/>

            <Modal height={250} maxHeight={250} ref={successRef} component={
                <View style={styles.modalContent}>
                    <Ionicons name="checkmark-circle" color="green" size={50} />
                    <Text style={styles.modalTitle}>Cadastro enviado com sucesso!</Text>
                    <Text style={styles.modalDescription}>Estamos a validar suas informações. Tão logo for aprovado, você estará habilitado a oferecer BOLEIA.</Text>
                    <Button isLoading={false} onPress={() => navigate.navigate("typepassword", {phone: "9876543"})} text="OK" isPrimary/>
                </View>
            }/>

         </View>
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