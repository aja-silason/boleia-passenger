import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modalize } from 'react-native-modalize';
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { InputPassword } from "../components/input/InputPassword";
import { Modal } from "../components/modal/Modal";

export default function TypePasswordScreen(){

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    }


    return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <HeaderBack title="Defina a sua senha" description="Crie uma senha segura para proteger sua conta."/>
                    
                    <InputPassword onChange={() => {}} placeholder="******" title="Senha"/>

                    <View style={styles.countionContent}>
                        <Ionicons name="information-circle-outline" color={Colors.placeHolder}/>
                        <Text style={styles.caution}>Mínimo 8 caracteres</Text>
                    </View>
                    
                    <InputPassword onChange={() => {}} placeholder="******" title="Repetir senha"/>
                    
                    <Button isLoading={false} onPress={onOpen} text="Continuar" isPrimary/>
                
                </View>

                <Modal height={250} maxHeight={250} ref={modalizeRef} component={
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" color="green" size={50} />
                        <Text style={styles.modalTitle}>Sua senha foi atualizada!</Text>
                        <Text style={styles.modalDescription}>Por motivos de segurança, enviamos uma notificação à sua conta confirmando esta alteração.</Text>
                        <Button isLoading={false} onPress={() => navigate.replace("signin")} text="OK" isPrimary/>
                    </View>
                }/>

            </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        gap: 20
    },
    caution: {
        color: Colors.placeHolder,
        fontSize: 12,
    },
    countionContent: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginTop: -15
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
    }
})