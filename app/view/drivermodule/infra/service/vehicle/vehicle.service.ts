import { api } from "@/app/infra/service/api";
import { EditVehicleInput } from "../../hooks/vehicle/EditVehicleInput";
import { RegisterVehicleInput } from "../../hooks/vehicle/RegisterVehicleInput";
import { VehicleOutput } from "./VehicleOutput";

export namespace Vehicle {
    export const vehicle = {
        registerVehicle:  (input: RegisterVehicleInput) => {
            console.log(JSON.stringify(input, null, 2))
            return api.post<void>('vehicle', input, {skipAuth: true});
        },

        editVehicle:  (id: string, input: EditVehicleInput) => {
            return api.patch<void>('vehicle/'+id, input, {skipAuth: true});
        },

        findAllVehicle: (id: string) => {
            return api.get<VehicleOutput[]>('vehicle/driver/all/'+id, {skipAuth: true});
        }
    }
}