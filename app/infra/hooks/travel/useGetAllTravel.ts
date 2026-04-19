import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Travel } from "../../service/travel/travel.service";
import { TravelOutput } from "../../service/travel/TravelOutput";

export const useGetAllTravel = () => {
    const [data, setData] = useState<TravelOutput[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const {userInformation} = useAuthContext();

    const passangerId = userInformation != null ? userInformation?.id : "N-D";

    const handleFetch = useCallback(async () => {

        try {
            
            setIsLoading(true);
            setIsError(false);

            if(passangerId === "N-D") return;

            const res = await Travel.travel.findAllTravel(passangerId);

            setData(res.data);

        } catch (error) {
            setIsError(true);
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Não foi possível carregar as viagens.";
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você");
                if(error.status !== 500) return Alert.alert("Aviso", message);
            }
        } finally {
            setIsLoading(false);
        }

    }, [passangerId]);

    return {
        data,
        isLoading,
        isError,
        handleFetch
    }

}