import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuthContext } from "../shared/context/auth.context";
import { RootStackParamList } from "../shared/route";

export default function ReloadScreen(){

    const {userInformation} = useAuthContext();

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    useEffect(() => {

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