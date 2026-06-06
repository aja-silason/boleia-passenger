import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { PoliticsOutput } from "../../service/settings/PoliticsOutput";
import { Settings } from "../../service/settings/setting.service";

export const useGetPolitcs = () => {
    const [data, setData] = useState<PoliticsOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await Settings.settings.getPrivacyPolitcs();

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar as politicas de privacidade:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as politicas de privacidade.";
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