import { Colors } from "@/constants/theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";

export default function AccountDataScreen() {
    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Dados da Conta" description="Mantenha seus dados de contacto atualizados." />
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <Input title="Nome Completo" placeholder="Anania Augusto" onChange={() => {}} />
                    <Input title="E-mail" placeholder="anania.augusto@email.com" onChange={() => {}} />
                    <Input title="Telefone" placeholder="+244 923 000 000" onChange={() => {}} />
                    
                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>NIF / Identificação</Text>
                        <Text style={styles.infoValue}>006543210LA044</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button text="Salvar Alterações" isPrimary isLoading={false} onPress={() => {}} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: { flex: 1, backgroundColor: "#fff" },
    container: { padding: 20, flexGrow: 1 },
    form: { gap: 15, marginTop: 20 },
    footer: { marginTop: 'auto', paddingTop: 20 },
    infoBox: { backgroundColor: "#F8F9FA", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#EEE" },
    infoTitle: { fontSize: 12, color: Colors.placeholderText, marginBottom: 5 },
    infoValue: { fontSize: 15, fontWeight: "600", color: "#333" }
});