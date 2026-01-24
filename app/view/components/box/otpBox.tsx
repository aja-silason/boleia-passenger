import { RootStackParamList } from "@/app/shared/route"
import { Colors } from "@/constants/theme"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, Text, View } from "react-native"

type props = {
    code: string
}

export const OTPBox = (props: props) => {
    
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const boxes = [0, 1, 2, 3, 4, 5];

    const handleLoging = () => {
        if(props.code.length === 6) {
            if(props.code === "123456") return navigate.replace("typepassword", {phone: "944996909"})
        }
    }

    handleLoging();

    return (
        <View style={styles.container}>
            {
                boxes?.map((index) => {
                    const char = props.code[index] || "";

                    return (
                        <View style={[styles.box, char !== "" && styles.activeBox]} key={index}>
                            <Text style={styles.text}>{char}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap"
    },
    box: {
        borderWidth: 1,
        borderColor: Colors.placeHolder,
        width: "15%",
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    activeBox: {
        borderColor: Colors.primary
    },
    text: {
        fontWeight: "700",
        fontSize: 16
    }
})