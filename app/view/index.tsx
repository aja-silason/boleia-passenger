import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import { useAuthContext } from "../shared/context/auth.context";
import { RootStackParamList } from "../shared/route";

export default function SplashScreen() {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [progress] = useState(new Animated.Value(0));
    
    const {userInformation} = useAuthContext();

    const redirectFunction = () => {
        if(!userInformation) return navigate.replace("welcome");
        return navigate.replace("tabs");
    }

    useEffect(() => {
        Animated.timing(progress, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false
        }).start(() => {
            redirectFunction()
        })
    }, [userInformation]);
  return (
        <View style={style.container}>
            <Image source={require("@/assets/images/splash_icon.png")} style={style.image}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: Colors.background,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: "50%",
        height: "20%"
    } 
});