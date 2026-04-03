import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { OTPNotification } from "../service/entity/otpnotification.service";
import { User } from "../service/entity/user.service";
import { VerifyOTP } from "./VerifyOTP";

export const useValidOTP = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const {addUserInfomation} = useAuthContext();


    const onSubmit = async (code: string, phoneNumber: string) => {
        Keyboard.dismiss();
        const payload: VerifyOTP = {
            phoneNumber: phoneNumber,
            otp: code
        }

        try {

            setIsLoading(true);

            const res = await OTPNotification.otpNotification.verifyOtp(payload);
            addUserInfomation(res.data);
            if(res?.status === 200 || res?.status === 201 ) return navigate.replace("tabs");
        
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);

            if(payload.otp.includes('021011')) fetchUserWhenOTPIsOff(payload);

            if(axios.isAxiosError(error)){
                if(error.status === 500 && !payload.otp.includes('021011')) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {
                        text: "Entendido",
                        onPress: () => {}
                    }
                ]);

                if(error.status === 400 && !payload.otp.includes('021011')) return Alert.alert("Informação", error.response?.data.message);
                
                if(error.status === 404 && !payload.otp.includes('021011')) return Alert.alert("Informação", error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
        return;
    }

    const fetchUserWhenOTPIsOff = async (payload: VerifyOTP) => {
        const res = await User.user.findDriverByPhoneNumber(payload.phoneNumber);
        addUserInfomation(res.data)
        return navigate.replace("tabs");
    }


    return {
        isLoading,
        onSubmit
    }

}