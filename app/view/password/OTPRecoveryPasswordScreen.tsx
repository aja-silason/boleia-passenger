import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { OTPBox } from "../components/box/otpBox";
import { LinkButton } from "../components/button/LinkButton";
import { HeaderBack } from "../components/header/HeaderBack";
import { NumericKeyBoard } from "../components/keyboard/NumericKeyboard";

export const OTPRecoveryPasswordScreen = () => {

    const [otp, setOtp] = useState<string>("");

    // const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

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

    console.log("OTP => ", otp)

    return (
        <View style={style.mainContainer}>
            <View style={style.container}>
                <HeaderBack title="Confirmar o seu número" description="Enviamos o OTP por sms para o número " isOtp number={"944996909"}/>
                
                <OTPBox code={otp}/>

                <View style={style.countionContent}>
                    <Ionicons name="information-circle-outline" color={Colors.placeHolder}/>
                    <Text style={style.caution}>Não recebeu o código?</Text>
                    <LinkButton isLoading onPress={()=> {}} text="Reenviar" isPrimary/>
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
        justifyContent: "flex-end",
        // marginTop: -
    },
})