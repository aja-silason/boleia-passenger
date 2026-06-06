import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Auth } from "../service/entity/auth.service";
import { AuthInput } from "./AuthInput";

export const useAtributePassangerPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const {addUserInfomation} = useAuthContext();


    const onSubmit = async (code: string, phoneNumber: string) => {
        Keyboard.dismiss();
        const payload: AuthInput = {
            phoneNumber: phoneNumber,
            password: code
        }

        try {
            setIsLoading(true);

            await Auth.auth.addPassword(payload);
            const res = await Auth.auth.login(payload);

            addUserInfomation(res.data);
            if(res?.status === 200 || res?.status === 201 ) return navigate.replace("tabs");

            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);

            if(axios.isAxiosError(error)){
                if(error.status === 500 && !payload.password.includes('021011')) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {
                        text: "Entendido",
                        onPress: () => navigate.replace("signin")
                    }
                ]);

                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
            }
        } finally {
            setIsLoading(false);
        }
        return;
    }

    return {
        isLoading,
        onSubmit
    }

}