import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Settings } from "../../service/settings/setting.service";
import { SystemInformationOutput } from "../../service/settings/SystemInformationOutput";

export const useGetSystemInformation = () => {
    const [data, setData] = useState<SystemInformationOutput>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await Settings.settings.getInformation();

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar as informações do sistema:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as informações do sistema.";
                Alert.alert("Aviso", message);
            }
        } finally {
            setIsLoading(false);
        }

    }, []);

    return {
        data,
        isLoading,
        isError,
        handleFetch
    }
}