import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Update from "expo-updates";
import { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useAuthContext } from "../shared/context/auth.context";
import { RootStackParamList } from "../shared/route";

export default function ReloadScreen(){

    const {userInformation} = useAuthContext();

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    useEffect(() => {

        const onCheckIfHasUpdate = async () => {
            try {
                const update = await Update.checkForUpdateAsync();
                if(update.isAvailable) {
                    Alert.alert("Sistema", "Actualização disponivel, feche a aplicação e volte abrir", [{text: "OK", onPress: () => {}}]);
                    await Update.fetchUpdateAsync();
                    await Update.reloadAsync();
                }
            } catch (error) {
                console.log("Erro ao buscar actualizações");
            }

            if (!userInformation) {
                navigate.replace("welcome");
            } else {
                navigate.replace("tabs");
            }
        }

        onCheckIfHasUpdate();

    }, [userInformation, navigate])

    return (
        <View style={styles.container}>
            <ActivityIndicator size={40} color={Colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})