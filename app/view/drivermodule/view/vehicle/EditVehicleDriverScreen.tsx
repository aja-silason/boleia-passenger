import { useEditVehicle } from "@/app/infra/hooks/vehicle/useEditVehicle";
import { VehicleOutput } from "@/app/infra/service/vehicle/VehicleOutput";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { BackHandler, Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";
import { LoadingModal } from "../components/modal/LoadingModal";
import { Modal } from "../components/modal/Modal";


export default function EditVehicleDriverScreen() {
  const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "editVehicle">>();

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
  
  const { isLoading, data: vehicleInformation, handleChange, handleSubmit } = useEditVehicle(route?.params.data as VehicleOutput);

  const successRef = useRef<Modalize>(null);

  const handleSave = async () => {
    Keyboard.dismiss();
    const res = await handleSubmit();
    if(res){
      successRef.current?.open();
    }
  }

  return (
    <View style={styles.mainContent}>
      <LoadingModal visible={isLoading} />
      
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <HeaderBack 
            title="Editar Veículo" 
            description="Atualize as informações do seu carro cadastrado."
        />

        <View style={styles.formSection}>
            <View style={styles.carinfo}>
                <Input 
                    value={vehicleInformation.brand}
                    onChange={(value) => handleChange("brand", value)} 
                    placeholder="Ex: Toyota" 
                    title="Marca" 
                    isHalf
                />
                <Input 
                    value={vehicleInformation?.model}
                    onChange={(value) => handleChange("model", value)} 
                    placeholder="Ex: Corolla" 
                    title="Modelo" 
                    isHalf
                />
            </View>

            <View style={styles.carinfo}>
                <Input 
                    value={vehicleInformation?.serieYear}
                    onChange={(value) => handleChange("seriesYear", value)} 
                    placeholder="2022" 
                    title="Ano" 
                    isHalf
                />
                <Input 
                    value={vehicleInformation?.color}
                    onChange={(value) => handleChange("color", value)} 
                    placeholder="Preto" 
                    title="Cor" 
                    isHalf
                />
            </View>

            <View style={styles.carinfo}>
                <Input 
                    value={vehicleInformation?.plate}
                    onChange={(value) => handleChange("plate", value)} 
                    placeholder="LD-00-00-XX" 
                    title="Matrícula" 
                    isHalf
                />
                <Input 
                    value={vehicleInformation?.seats?.toString()}
                    onChange={(value) => handleChange("seats", value)} 
                    placeholder="4" 
                    title="Lugares" 
                    isHalf
                />
            </View>
        </View>

        <View style={{ paddingTop: 30 }}>
          <Button 
            isLoading={isLoading} 
            onPress={handleSave} 
            text="Salvar Alterações" 
            isPrimary 
          />
        </View>
      </ScrollView>

      {/* Modal de Sucesso */}
      <Modal height={280} maxHeight={280} ref={successRef} component={
        <View style={styles.modalContent}>
          <Ionicons name="checkmark-circle" color="#28a745" size={60} />
          <Text style={styles.modalTitle}>Veículo atualizado!</Text>
          <Text style={styles.modalDescription}>
            As informações do seu veículo foram atualizadas com sucesso.
          </Text>
          <View style={{ width: '100%', marginTop: 10 }}>
            <Button 
                isLoading={false}
                onPress={() => navigate.goBack()} 
                text="Voltar para Detalhes" 
                isPrimary 
            />
          </View>
        </View>
      }/>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#fff"
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formSection: {
    gap: 15,
    marginTop: 20
  },
  carinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
    gap: 10,
  },
  modalTitle: {
    color: Colors.background,
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center"
  },
  modalDescription: {
    color: Colors.placeHolder,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10
  },
});