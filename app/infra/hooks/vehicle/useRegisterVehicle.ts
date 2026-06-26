import { useAuthContext } from "@/app/shared/context/auth.context";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Vehicle } from "../../service/vehicle/vehicle.service";
import { RegisterVehicleInput } from "./RegisterVehicleInput";

export const useRegisterVehicle = (phoneNumber: string) => {

    const {userInformation} = useAuthContext()

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<RegisterVehicleInput>({idDriver: "", plate: "", model: "", color: "", brand: "", seats: "", serieYear: ""})
    
    const handleChange = (name: string, value: string) => {
        setData((prevState) => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {
            setIsLoading(true)

            const driverId = userInformation?.driverId;

            const payload: RegisterVehicleInput = {
                ...data,
                idDriver: driverId as string
            }

            await Vehicle.vehicle.registerVehicle(payload);

            setIsLoading(false)
            return true;
            
        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);   
            }
            return false;
        }

    }

    return {
        handleChange,
        handleSubmit,
        isLoading,
        data
    }

}