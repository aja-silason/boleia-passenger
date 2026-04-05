import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Travel } from "../../service/travel/travel.service";
import { TravelOutput } from "../../service/travel/TravelOutput";

export const useGetFindByTravelId = () => {
    const [data, setData] = useState<TravelOutput>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleFetch = useCallback(async (id: string) => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            const res = await Travel.travel.findByTravelId(id);

            setData(res.data);

        } catch (error) {
            setIsError(true);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as informações da viagem.";
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