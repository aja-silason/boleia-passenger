import { countryCodes } from "@/app/shared/utils/countycode.utils"
import { Colors } from "@/constants/theme"
import { Picker } from "@react-native-picker/picker"
import { Dispatch, SetStateAction, useMemo } from "react"
import { StyleSheet, Text, View } from "react-native"
import { Input } from "./Input"

type Props = {
    setDdi: Dispatch<SetStateAction<string>>;
    ddi: string;
    setLocalPhone: Dispatch<SetStateAction<string>>
}

export const InputPhone = (props: Props) => {

    const placeholders: Record<string, string> = {
        "+244": "923 456 789",
        "+258": "841 234 567",
        "+238": "912 34 56",
        "+239": "901 2345",
        "+245": "951 234 567",
        "+240": "222 345 678",
        "+351": "912 345 678",
        "+55": "11 91234-5678"
    };

    const currentPlaceholder = useMemo(() => {
        return placeholders[props.ddi] || "923 456 789";
    }, [props.ddi]);

    return (
        <View style={style.row}>
            <View style={style.pickerContainer}>
                <Text style={style.label}>País</Text>
                <View style={style.pickerWrapper}>
                    <Picker
                        selectedValue={props.ddi}
                        onValueChange={(itemValue) => props.setDdi(itemValue)}
                        dropdownIconColor={Colors.primary}
                        style={style.picker}
                    >
                        {countryCodes.map(country => (
                            <Picker.Item 
                                key={country.value} 
                                label={country.label} 
                                value={country.value} 
                            />
                        ))}
                    </Picker>
                </View>
            </View>

            <View style={style.inputWrapper}>
                <Input
                    onChange={(value) => props.setLocalPhone(value)} 
                    placeholder={currentPlaceholder} 
                    title="Telefone" 
                    keyboardType="phone-pad"
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
            flex: 1
        },
        container: {
            paddingHorizontal: 20,
            paddingVertical: 40,
            gap: 20
        },
        row: {
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
        },
        pickerContainer: {
            width: "35%",
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
            height: 50,
            justifyContent: "center",
            backgroundColor: "#f9f9f9"
        },
        picker: {
            width: "100%",
        },
        inputWrapper: {
            flex: 1,
        }
})