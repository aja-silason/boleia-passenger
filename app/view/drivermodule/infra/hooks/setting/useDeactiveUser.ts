import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { Settings } from "../../service/settings/setting.service";

export const useDeactiveUser = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {userInformation } = useAuthContext();

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const logOut = async () => {
        await AsyncStorage.clear();
        navigate.replace("signin");
    }

    const handleSubmit = async () => {

        try {

            setIsLoading(true);
                        
            await Settings.settings.deleteUserAccount(userInformation?.id as string);
            setIsLoading(false);

            logOut();
            
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
            
        }

    }

    return {
        isLoading,
        handleSubmit
    }

}