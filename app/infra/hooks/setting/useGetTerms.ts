import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Settings } from "../../service/settings/setting.service";
import { TermsOutput } from "../../service/settings/TermsOutput";

export const useGetTerms = () => {
    const [data, setData] = useState<TermsOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await Settings.settings.getTerms();

            setData(res.data);

        } catch (error) {
            setIsError(true);
            console.error("Erro ao buscar os termos de uso:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar os termos de uso.";
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