import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { RequestSupportInput } from "../../service/settings/RequestSupportInput";
import { Settings } from "../../service/settings/setting.service";

export const useRequestSupport = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<RequestSupportInput>({userId: "", description: ""});

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
                        
            const res = await Settings.settings.requestSupport(payload);

            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 409) return Alert.alert("Informação", error.response?.data.message);
            }
            
        } finally {
            setData({description: "", userId: userInformation?.id as string});
        }

    }

    return {
        handleChange,
        data,
        isLoading,
        handleSubmit
    }

}