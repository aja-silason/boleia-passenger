import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Auth } from "../service/entity/auth.service";
import { User } from "../service/entity/user.service";
import { AuthInput } from "./AuthInput";

export const useSignIn = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addUserInfomation } = useAuthContext();

    const IS_BYPASS_CODE = (code: string) => code.includes("021011");

    const fetchUserWhenOTPIsOff = async (phoneNumber: string) => {
        try {
            const res = await User.user.findDriverByPhoneNumber(phoneNumber);
            addUserInfomation(res.data);
            navigate.replace("tabs");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível recuperar os dados do utilizador com o código de teste.");
        }
    };

    const handleAxiosError = (error: unknown, passwordCode: string) => {
        if (!axios.isAxiosError(error)) return;
        // if (IS_BYPASS_CODE(passwordCode)) return;

        const status = error.response?.status;
        const serverMessage = error.response?.data?.message || "Algo correu mal.";

            console.log("Erro aqui x", error.isAxiosError)
        if (status === 400 || status === 404) {
            Alert.alert("Informação", serverMessage);
            return;
        }

        if (status === 500) {
            Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                { text: "Entendido" }
            ]);
            return;
        }

        if(error) {
            Alert.alert("Aviso", "Erro ao manter a comunicação com os servidores. Tente mais tarde!", [
                {text: "Ok"}
            ]);
            return;
        }

    };

    const onSubmit = async (code: string, phoneNumber: string) => {
        Keyboard.dismiss();
        setIsLoading(true);

        const payload: AuthInput = {
            phoneNumber,
            password: code
        };

        try {
            console.log("Aqui");
            const res = await Auth.auth.login(payload);

            console.log(JSON.stringify(res));

            if (res?.status === 200) {
                const userType = res.data?.type || "";
                addUserInfomation(res.data);

                if (userType.includes("DRIVER")) return navigate.replace("tabsDriver");
                if (userType.includes("PASSANGER")) return navigate.replace("tabs");
            }
        } catch (error) {
            handleAxiosError(error, payload.password);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        onSubmit
    };
};