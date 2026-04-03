import { api } from "../api"
import { UserOutput } from "./UserOutput"

export namespace User {
    export const user = {
        findById: (id: string) => {
            return api.get<UserOutput>(`user/passanger/${id}`, {skipAuth: true})
        },
        findDriverByPhoneNumber: (phoneNumber: string) => {
            return api.get<UserOutput>(`user/{phoneNumber}?phoneNumber=${encodeURIComponent(phoneNumber)}`, {skipAuth: true})
        },
    }
}