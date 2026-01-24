import { RootStackParamList } from "@/app/shared/route";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";

export const RecoveryPasswordScreen = () => {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    return (
        <View style={style.mainContainer}>
            <View style={style.container}>
                <HeaderBack title="Redifinir a senha" description="Enviaremos um código para confirmar sua identidade."/>
                
                <Input onChange={() => {}} placeholder="(+244) 923 456 789" title="Telefone" type="telephoneNumber"/>
                
                <Button isLoading onPress={()=> navigate.navigate("optrecovery", {phone: "944996909"})} text="Entrar" isPrimary/>
            
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
    }
})