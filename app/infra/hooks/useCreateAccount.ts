import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Auth } from "../service/entity/auth.service";
import { OTPNotification } from "../service/entity/otpnotification.service";
import { SignUpInput } from "./SignUpInput";

export const useCreateAccount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ddi, setDdi] = useState("+244");
    const [localPhone, setLocalPhone] = useState("");
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const formatPhoneNumber = (text: string) => {
        const cleaned = text.replace(/\D/g, "");
        let formatted = cleaned;
        if (cleaned.length > 3 && cleaned.length <= 6) {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        } else if (cleaned.length > 6) {
            formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 9)}`;
        }
        setLocalPhone(formatted);
    };

    const [data, setData] = useState<SignUpInput>({firstName: "", isDriver: false, lastName: "", phoneNumber: ""});

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async () => {
        Keyboard.dismiss();

        const pureNumber = localPhone.replace(/-/g, "");
        if (pureNumber.length < 9) return Alert.alert("Aviso", "Número incompleto", [
            {
                text: "Inserir número",
                onPress: () => {}
            }
        ]);
        
        const fullNumber = `${ddi}${pureNumber}`;

        const payload: SignUpInput = {
            ...data,
            isDriver: false,
            phoneNumber: fullNumber
        }

        try {
            setIsLoading(true);
            
            await Auth.auth.signUp(payload);
            await OTPNotification.otpNotification.requestOTP(localPhone);

            setIsLoading(false);

            return navigate.replace("otp", {phone: fullNumber})

        } catch (error) {
            setIsLoading(false);
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 409) {
                        Alert.alert("Informação", error.response?.data.message, [
                            {
                                text: "Cancelar",
                                onPress: () => {}
                            },
                            {
                            text: "Iniciar sessão",
                            onPress: async () => {
                                const res = await onRetryRequest(fullNumber);
                                if(res) navigate.navigate("otp", {phone: fullNumber})
                            }
                            }
                        ]);
                } 
            }
        }

    }


    const onRetryRequest = async (fullNumber: string) => {

        try {
            setIsLoading(true)
                await OTPNotification.otpNotification.requestOTP(fullNumber);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.log("Mapeamento do erro no request otp", error)
            setIsLoading(false);
            Alert.alert("Informação", "Alguma coisa ocorreu mal, estamos resolvendo por você!", [
                {
                    text: "Entendido",
                    onPress: () => setIsLoading(false)
                }
            ]);
            return false;
        }
    };


    return {
        handleChange,
        handleSubmit,
        formatPhoneNumber,
        ddi,
        data,
        setDdi,
        setLocalPhone,
        isLoading,
    }


}