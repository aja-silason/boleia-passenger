import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { LinkButton } from "./components/button/LinkButton";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";
import { InputPassword } from "./components/input/InputPassword";

export default function SignInScreen(){

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.mainContent}>
            <View style={styles.container}>
                <HeaderBack title="Entre na sua conta" description="" goBack={() => navigate.replace("welcome")}/>
                
                <Input onChange={() => {}} placeholder="(+244) 923 456 789" title="Telefone" type="telephoneNumber"/>
                <InputPassword onChange={() => {}} placeholder="******" title="Senha"/>

                <View style={styles.link}>
                    <LinkButton isLoading onPress={()=> navigate.navigate("recoverpassword")} text="Esqueci a minha senha" isPrimary/>
                </View>

                <Button isLoading onPress={()=> navigate.replace("tabs")} text="Entrar" isPrimary/>
            </View>
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
    }
})