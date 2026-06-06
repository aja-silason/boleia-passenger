import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Auth } from "../service/entity/auth.service";
import { ReplacePasswordInput } from "./ReplacePasswordInput";

type Props = {
    oldPassword: string
    confirmPassword: string;
} 

export const useReplacePassword = () => {

    const [data, setData] = useState<Props>({confirmPassword: "", oldPassword: ""});
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const route = useRoute<RouteProp<RootStackParamList, "typepassword">>();

    const {userInformation} = useAuthContext();
    

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name] : value
        }))
    }

        console.log(route?.params?.phoneNumber)


    const handleSubmit = async () => {
        Keyboard.dismiss();

        if(data.confirmPassword.length !== 6) return Alert.alert("Informação", "A senha deve ter exatamente 6 caracteres.");

        if(data.confirmPassword !== data.oldPassword) return Alert.alert("Informação", "Senha não coincidem, tente novamente");



        const payload: ReplacePasswordInput = {
            driverId: userInformation?.id as string,
            oldPassword: data.oldPassword,
            confirmPassword: data.confirmPassword,
        }

        try {
            setIsLoading(true);

            await Auth.auth.changePassword(payload);
            
            setIsSuccess(true);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
            setIsSuccess(false);
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", `Alguma coisa correu mal, estamos resolvendo por você`, [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
            }
        }

    }

    return {
        handleSubmit,
        handleChange,
        isLoading,
        isSuccess,
        data
    }
}