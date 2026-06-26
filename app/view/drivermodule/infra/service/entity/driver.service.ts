import { api } from "@/app/infra/service/api"
import { DriverOuput } from "./UserOutput"

export namespace Driver {
    export const driver = {
        findDriverByIdentificationNumber: (identificationNumber: string) => {
            return api.get<DriverOuput>(`driver/indentification-number/${identificationNumber}`, {skipAuth: true})
        },
        findDriverByPhoneNumber: (phoneNumber: string) => {
            return api.get<DriverOuput>(`driver/phone-number?phoneNumber=${encodeURIComponent(phoneNumber)}`, {skipAuth: true})
        },

        uploadDocument: (formData: FormData, id: string) => {
            return api.patch<{success: boolean}>(`user/${id}/submet-documents`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 60000
                }
            )
        },
    }
}