import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { CancelTravelRequest } from "../../service/travel/CancelTravelRequest";
import { Travel } from "../../service/travel/travel.service";

export const useCancelRequestTravel = (travelId: string, passangerId: string) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const {userInformation} = useAuthContext();

    const driverId = userInformation !== null ? userInformation.id : "N-D";

    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {

            setIsLoading(true)
            
            const payload: CancelTravelRequest = {
                passangerId: passangerId,
                travelId: travelId
            }

            if(driverId === "N-D") return;

            console.log(JSON.stringify(payload, null, 2))
            
            await Travel.travel.cancelRequestTravel(payload);

            setIsLoading(false)

            return true;
            
        } catch (error) {
            setIsLoading(false)
            setIsError(true);
            if(axios.isAxiosError(error)){
                console.log(JSON.stringify({logs: error.response?.data}, null, 2))
                if(error.status === 500) return Alert.alert("Aviso", `Alguma coisa correu mal, estamos resolvendo por você`, [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);   
                if(error.status === 409) return Alert.alert("Informação", error.response?.data.message);   
            }

            return false;
        } finally {
            setIsError(false)
        }

    }

    return {
        handleSubmit,
        isLoading,
        isError,
        setIsError
    }

}