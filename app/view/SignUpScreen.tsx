import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useCreateAccount } from "../infra/hooks/useCreateAccount";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";
import { InputPhone } from "./components/input/phoneinput";
import { LoadingModal } from "./components/modal/LoadingModal";

enum STEP {
  step_1 = 0,
  step_2 = 1
}

export default function SignUpScreen() {
  const [step, setStep] = useState<STEP>(STEP.step_1);
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {ddi, setLocalPhone, setDdi, handleSubmit, handleChange, isLoading} = useCreateAccount();

  const handleGoBack = () => {
    if (step === STEP.step_1) {
      navigate.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === STEP.step_2) {
      handleSubmit();
    } else {
      setStep((prev) => prev + 1);
    }
  };

 
     return (
         <View style={styles.mainContent}>
            <LoadingModal visible={isLoading} />
             <View style={styles.container}>
                 <HeaderBack title="Crie sua conta" description="Precisamos de algumas informações para começar." goBack={handleGoBack}/>

                 {
                    step === STEP.step_1 && (
                        <View style={styles.userinfo}>
                            <Input onChange={(value) => handleChange("firstName", value)} placeholder="João" title="Primeiro Nome" type="telephoneNumber" isHalf/>

                            <Input onChange={(value) => handleChange("lastName", value)} placeholder="Ninguem" title="Último Nome" type="telephoneNumber" isHalf/>
                        </View>
                    )
                 }

                 {
                    step === STEP.step_2 && (
                        <InputPhone ddi={ddi} setDdi={setDdi} setLocalPhone={setLocalPhone} />
                    )
                 }
                 


                <View style={{paddingTop: 20}}>
                    <Button 
                        isLoading={false}
                        onPress={handleNext}
                        text={step === STEP.step_2 ? "Finalizar" : "Continuar"}  
                        isPrimary
                    />
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