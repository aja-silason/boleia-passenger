import { Colors } from "@/constants/theme";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { OTPBox } from "./components/box/otpBox";
import { HeaderBack } from "./components/header/HeaderBack";
import { NumericKeyBoard } from "./components/keyboard/NumericKeyboard";

export const OtpCreatePasswordScreen = () => {

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

    const [otp, setOtp] = useState<string>("");

    const route = useRoute<RouteProp<RootStackParamList, "otp">>();


    const handleNumberPress = (num: string) => {
        if(otp.length < 6) {
            setOtp(prev => prev + num);
        }
    }

    const handleDelete = () => {
        setOtp(prev => prev.slice(0, -1));
    }

    const handleClear = () => {
        setOtp("");
    }

    return (
        <View style={style.mainContainer}>
            <View style={style.container}>
                <HeaderBack title="Criar senha" description="Digite a senha que deverá ser usado junto a:" isOtp number={route?.params?.phone}/>
                
                <OTPBox code={otp} phoneNumber={route?.params.phone}/>

                <View style={style.countionContent}>
                </View>
                
                <NumericKeyBoard onClear={handleClear} onDelete={handleDelete} onPressNumber={handleNumberPress}/>

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
    caution: {
        color: Colors.placeHolder,
        fontSize: 12,
    },
    countionContent: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "flex-end"
    },
})