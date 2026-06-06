import { Colors } from "@/constants/theme"
import { Picker } from "@react-native-picker/picker"
import { Dispatch, SetStateAction } from "react"
import { StyleSheet, Text, View } from "react-native"

export type Vehicle = {
    id: string;
    model: string;
    plate: string;
}

type Props = {
    vehicles: Vehicle[];
    selectedVehicleId: string;
    setSelectedVehicleId: Dispatch<SetStateAction<string>>;
}

export const InputVehicle = (props: Props) => {
    return (
        <View style={style.container}>
            <Text style={style.label}>Selecione o Veículo</Text>
            
            <View style={style.pickerWrapper}>
                <Picker
                    selectedValue={props.selectedVehicleId}
                    onValueChange={(itemValue) => props.setSelectedVehicleId(itemValue)}
                    dropdownIconColor={Colors.primary}
                    style={style.picker}
                    mode="dropdown" 
                >
                    <Picker.Item label="Escolha o veículo para essa viagem" value="" color={Colors.placeHolder} />
                    
                    {props.vehicles.map(vehicle => (
                        <Picker.Item 
                            key={vehicle.id} 
                            label={`${vehicle.model} - ${vehicle.plate}`} 
                            value={vehicle.id} 
                        />
                    ))}
                </Picker>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 15
    },
    label: {
        fontSize: 14,
        color: Colors.background,
        marginBottom: 8,
        fontWeight: "600"
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: Colors.placeHolder,
        borderRadius: 8,
        height: 55, // Aumentado levemente para melhor toque
        justifyContent: "center",
        backgroundColor: "#f9f9f9",
        overflow: "hidden" // Garante que o Picker respeite o borderRadius
    },
    picker: {
        width: "100%",
        color: "#333"
    }
})