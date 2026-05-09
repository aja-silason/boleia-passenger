import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { RequestSupportInput } from "../../service/settings/RequestSupportInput";
import { Settings } from "../../service/settings/setting.service";

export const useRequestSupport = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<RequestSupportInput>({userId: "", message: ""});

    const {userInformation} = useAuthContext();

    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async () => {

        const payload: RequestSupportInput = {
            ...data,
            userId: userInformation?.id as string
        }

        try {

            setIsLoading(true);
            console.log("Enviando", JSON.stringify(payload, null, 2))

            await Settings.settings.requestSupport(payload);

            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);
            if(axios.isAxiosError(error)){
                console.log(JSON.stringify(error, null, 2))
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 409) return Alert.alert("Informação", error.response?.data.message);
            }
            
        } finally {
            setData({message: "", userId: userInformation?.id as string});
        }

    }

    return {
        handleChange,
        data,
        isLoading,
        handleSubmit
    }

}