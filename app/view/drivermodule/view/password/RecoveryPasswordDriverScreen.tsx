import { useRequestOTP } from "@/app/infra/hooks/useRequestOTP";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { InputPhone } from "../components/input/phoneinput";

export const RecoveryPasswordDriverScreen = () => {

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

    const {ddi, setDdi, setLocalPhone, onSubmit, isLoading} = useRequestOTP();

    return (
        <View style={style.mainContainer}>
            <View style={style.container}>
                <HeaderBack title="Redifinir a senha" description="Enviaremos um código para confirmar sua identidade."/>

                <InputPhone ddi={ddi} setDdi={setDdi} setLocalPhone={setLocalPhone} />

                <Button isLoading={isLoading} onPress={onSubmit} text="Entrar" isPrimary/>
            
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        gap: 20
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
    },
    pickerContainer: {
        width: "35%",
    },
    label: {
        fontSize: 14,
        color: Colors.background,
        marginBottom: 8,
        fontWeight: "600"
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: Colors.placeHolder,
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
        backgroundColor: "#f9f9f9"
    },
    picker: {
        width: "100%",
    },
    inputWrapper: {
        flex: 1,
    }
})