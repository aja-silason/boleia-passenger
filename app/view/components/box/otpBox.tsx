import { useValidOTP } from "@/app/infra/hooks/useValidOTP"
import { Colors } from "@/constants/theme"
import { useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { LoadingModal } from "../modal/LoadingModal"

type props = {
    code: string;
    phoneNumber: string;
}

export const OTPBox = (props: props) => {
    const {isLoading, onSubmit} = useValidOTP();

    useEffect(() => {
        if(props.code.length === 6){
            onSubmit(props.code, props.phoneNumber)
        }
    }, [props.code]);

    const boxes = [0, 1, 2, 3, 4, 5];

    return (
        <View style={styles.container}>
            <LoadingModal visible={isLoading} />
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