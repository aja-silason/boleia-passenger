import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useAuth } from "../infra/hooks/useAuth";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { HeaderBack } from "./components/header/HeaderBack";
import { InputPhone } from "./components/input/phoneinput";

export default function SignInScreen(){

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

    const {ddi, setDdi, setLocalPhone, handleSubmit, isLoading} = useAuth();

    return (
        <View style={styles.mainContent}>
            <View style={styles.container}>
                <HeaderBack title="Entre na sua conta" description="" goBack={() => navigate.replace("welcome")}/>

                <InputPhone ddi={ddi} setDdi={setDdi} setLocalPhone={setLocalPhone} />


                <Button isLoading={isLoading} onPress={handleSubmit} text="Entrar" isPrimary/>
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
        gap: 20
    },
    link: {
        alignItems: "flex-end",
        paddingTop: 10,
        paddingBottom: 30
    }
})