import { RootStackParamList } from "@/app/shared/route";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Travel } from "../../service/travel/travel.service";
import { SearchTravels } from "./SearchTravels";

export type QueryTravelRquest = {
    date: string;
    where: string;
    from: string;
    quantity: number;
}

export const useSearchTravel = () => {
    const [data, setData] = useState({destiny: "", seats: 0});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
        const handleChange = (name: string, value: string) => {
            setData((prevState) => ({
                ...prevState, [name]: value
            }))
        }    

    const handleSubmit = async () => {
        Keyboard.dismiss();
        
        try {
            setIsLoading(true)
            
            const payload: SearchTravels = {
                location: data.destiny,
                seats: +data.seats
            }
             
            const res = await Travel.travel.searchTravel(payload);

            console.log(JSON.stringify(res.data, null, 2));

            navigate.navigate("travelavailable", { travels: res.data, from: data.destiny });

            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            if(axios.isAxiosError(error)){
                if(error.status === 500) return Alert.alert("Aviso", "Alguma coisa correu mal, estamos resolvendo por você", [
                    {text: "Entendido", onPress: () => {}}
                ]);
                if(error.status === 400) return Alert.alert("Informação", error.response?.data.message);
                if(error.status === 404) return Alert.alert("Informação", error.response?.data.message);   
            }
        }

    }

    return {
        handleSubmit,
        handleChange,
        isLoading
    }

}