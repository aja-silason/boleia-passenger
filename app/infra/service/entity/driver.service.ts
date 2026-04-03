import { api } from "../api"
import { DriverOuput } from "./UserOutput"

export namespace Driver {
    export const driver = {
        findDriverByIdentificationNumber: (identificationNumber: string) => {
            return api.get<DriverOuput>(`driver/indentification-number/${identificationNumber}`, {skipAuth: true})
        },
        findDriverByPhoneNumber: (phoneNumber: string) => {
            return api.get<DriverOuput>(`driver/phone-number?phoneNumber=${encodeURIComponent(phoneNumber)}`, {skipAuth: true})
        },
    }
}