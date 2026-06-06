import { SignUpInput } from "@/app/infra/hooks/SignUpInput"
import { VehicleOutput } from "@/app/infra/service/vehicle/VehicleOutput"
import { Colors } from "@/constants/theme"
import { StyleSheet, Text, View } from "react-native"
import { BlueButton } from "../button/BlueButton"
import { Button } from "../button/Button"

type props = {
    redigite: VoidFunction;
    continue: VoidFunction;
    vehicle: VehicleOutput;
    driver: SignUpInput;
}

export const ConfirmUserInformationCard = (props: props) => {
    return (
        <View style={styles.mainContent}>
            <View style={styles.head}>
                <Text style={styles.title}>Confirme seus dados</Text>
                <Text style={styles.description}>Verifique se tudo está certo antes de seguir para validação.</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.column}>
                    <View>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.value}>{props?.driver.firstName+ ' '+props?.driver.lastName || ''}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Marca:</Text>
                        <Text style={styles.value}>{props?.vehicle.brand || ''}</Text>
                    </View>
                </View>

                <View style={styles.column}>
                    <View>
                        <Text style={styles.label}>Nº da Carta:</Text>
                        <Text style={styles.value}>{props?.driver.licenseNumber || ''}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Modelo:</Text>
                        <Text style={styles.value}>{props?.vehicle.model || ''}</Text>
                    </View>
                </View>

                <View style={styles.column}>
                    <View>
                        <Text style={styles.label}>Validade:</Text>
                        <Text style={styles.value}>{props?.vehicle.serieYear || ''}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Matrícula:</Text>
                        <Text style={styles.value}>{props?.vehicle.plate || ''}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonInfo}>
                <BlueButton isLoading={false} onPress={props?.redigite} text="Corrigir informações" isBlue/>
                <Button isLoading={false} onPress={props?.continue} text="Confirmar e enviar" isPrimary halfWidth={false}/>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        height: "100%"
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    head: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "600"
    },
    description: {
        textAlign: "center",
        color: Colors.placeholderText,
        fontSize: 14
    },
    column: {
        gap: 10
    },
    label: {
        color: Colors.placeholderText,
        fontSize: 13
    },
    value: {
        color: Colors.blackText,
        fontWeight: "600"
    },
    buttonInfo: {
        gap: 10,
        paddingTop: 10
    }
})