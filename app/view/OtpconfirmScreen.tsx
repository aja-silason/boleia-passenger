import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRequestOTP } from "../infra/hooks/useRequestOTP";
import { RootStackParamList } from "../shared/route";
import { OTPBox } from "./components/box/otpBox";
import { LinkButton } from "./components/button/LinkButton";
import { HeaderBack } from "./components/header/HeaderBack";
import { NumericKeyBoard } from "./components/keyboard/NumericKeyboard";
import { LoadingModal } from "./components/modal/LoadingModal";

export const OtpconfirmScreen = () => {

    const [otp, setOtp] = useState<string>("");

    const route = useRoute<RouteProp<RootStackParamList, "otp">>();

    const {isLoading, setLocalPhone, onRetryRequest: onSubmitRetry} = useRequestOTP();   

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

    const onRetryRequest = () => {
        setLocalPhone(route?.params.phone);
        onSubmitRetry();
    }


    return (
        <View style={style.mainContainer}>
            <LoadingModal visible={isLoading} />
            <View style={style.container}>
                <HeaderBack title="Confirmar o seu número" description="Enviamos o OTP por sms para o número " isOtp number={route?.params?.phone}/>
                
                <OTPBox code={otp} phoneNumber={route?.params.phone}/>

                <View style={style.countionContent}>
                    <Ionicons name="information-circle-outline" color={Colors.placeHolder}/>
                    <Text style={style.caution}>Não recebeu o código?</Text>
                    <LinkButton isLoading onPress={onRetryRequest} text="Reenviar" isPrimary/>
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