import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Update from "expo-updates";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuthContext } from "../shared/context/auth.context";
import { RootStackParamList } from "../shared/route";

export default function ReloadScreen(){

    const {userInformation} = useAuthContext();

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    const onCheckIfHasUpdate = async () => {
        try {
            
            if(__DEV__) return;

            const update = await Update.checkForUpdateAsync();

            if(update.isAvailable) {
                await Update.fetchUpdateAsync();
                await Update.reloadAsync();
            }

        } catch (error) {
            console.log("Erro ao buscar actualizações");
        }
    }

    useEffect(() => {

        onCheckIfHasUpdate();

        const timer = setTimeout(() => {
            if (!userInformation) {
                navigate.replace("welcome");
            } else {
                navigate.replace("tabs");
            }
        }, 2000);

        return () => clearTimeout(timer);


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