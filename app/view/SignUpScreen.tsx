import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";

export default function SignUpScreen() {
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const [userinfo, setUserIf] = useState<any>();
 
     return (
         <View style={styles.mainContent}>
             <View style={styles.container}>
                 <HeaderBack title="Crie sua conta" description="Precisamos de algumas informações para começar."/>
                 
                 <View style={styles.userinfo}>
                    <Input onChange={() => {}} placeholder="João" title="Primeiro Nome" type="telephoneNumber" isHalf/>
                    <Input onChange={() => {}} placeholder="Ninguem" title="Último Nome" type="telephoneNumber" isHalf/>
                 </View>

                <Input onChange={() => {}} placeholder="923456789" title="Telefone" type="telephoneNumber"/>

                <View style={{paddingTop: 20}}>
                    <Button isLoading onPress={()=> navigate.navigate("otp", {phone: "944996909"})} text="Continuar" isPrimary/>
                </View>
             </View>
         </View>
     )
 }
 
 const styles = StyleSheet.create({
     mainContent: {
         flex: 1
     }, 
     container: {
         paddingHorizontal: 20,
         paddingVertical: 40,
         gap: 5
     },
     link: {
         alignItems: "flex-end",
         paddingTop: 10,
         paddingBottom: 30
     },
     userinfo: {
        flexDirection: "row",
        justifyContent: "space-between"
     }
 })