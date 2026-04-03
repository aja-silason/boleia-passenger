import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Auth } from "../service/entity/auth.service";
import { AuthInput } from "./AuthInput";

export const useAuth = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ddi, setDdi] = useState("+244");
    const [localPhone, setLocalPhone] = useState("");
    const [data, setData] = useState<AuthInput>({phoneNumber: "", password: ""});

    const {addUserInfomation} = useAuthContext();

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
        
        const payload: AuthInput = {
            phoneNumber: fullNumber,
            password: data.password
        }

        try {

            setIsLoading(true)

            const res = await Auth.auth.login(payload);

            addUserInfomation(res.data);

            setIsLoading(false);

            if(res?.status === 200 || res?.status === 201 ) return navigate.replace("tabs");
            
        } catch (error) {

            setIsLoading(false);

            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {
                        text: "Entendido",
                        onPress: () => {}
                    }
                ]);

                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);
            }
            
        }

    }

    return {
        isLoading,
        handleChange,
        handleSubmit,
        setDdi,
        setLocalPhone,
        ddi
    }

}