import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { useCreateAccount } from "../infra/hooks/useCreateAccount";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { HeaderBack } from "./components/header/HeaderBack";
import { Input } from "./components/input/Input";
import { InputPhone } from "./components/input/phoneinput";
import { LoadingModal } from "./components/modal/LoadingModal";

enum STEP {
  step_1 = 0,
  step_2 = 1,
  step_3 = 2,
}

export default function SignUpDriverScreen() {
  const [step, setStep] = useState<STEP>(STEP.step_1);
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
      const backAction = () => {
          if(navigate.canGoBack()) {
              navigate.goBack();
              return true;
          }
          return false;
      };

      const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
      );

      return () => backHandler.remove();
  }, [navigate]);
  
  const { handleChange, setDdi, ddi, setLocalPhone, handleSubmit, isLoading } = useCreateAccount();

  const handleGoBack = () => {
    if (step === STEP.step_1) {
      navigate.goBack();
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (step === STEP.step_3) {
      handleSubmit();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.mainContent}>
      <LoadingModal visible={isLoading} />
      
      <View style={styles.container}>
        <HeaderBack 
          title="Crie sua conta" 
          description="Precisamos de algumas informações para começar." 
          goBack={handleGoBack} 
        />

        {step === STEP.step_1 && (
          <View style={styles.userinfo}>
            <Input 
              onChange={(v) => handleChange("firstName", v)} 
              placeholder="João" 
              title="Primeiro Nome" 
              isHalf 
            />
            <Input 
              onChange={(v) => handleChange("lastName", v)} 
              placeholder="Ninguem" 
              title="Último Nome" 
              isHalf 
            />
          </View>
        )}

        {step === STEP.step_2 && (
          <View style={styles.userinfo}>
            <Input 
              onChange={(v) => handleChange("identificationNumber", v)} 
              placeholder="001234567LA890" 
              title="Bilhete de identidade" 
              isHalf 
            />
            <Input 
              onChange={(v) => handleChange("licenseNumber", v)} 
              placeholder="43212" 
              title="Nº da Carta" 
              isHalf 
            />
          </View>
        )}

        {step === STEP.step_3 && (
          <InputPhone ddi={ddi} setDdi={setDdi} setLocalPhone={setLocalPhone} />
        )}

        <View style={styles.buttonContainer}>
          <Button 
            isLoading={false} 
            onPress={handleNext} 
            text={step === STEP.step_3 ? "Finalizar" : "Continuar"} 
            isPrimary 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    gap: 15, 
  },
  userinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    paddingTop: 20,
  }
});