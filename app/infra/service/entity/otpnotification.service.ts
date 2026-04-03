import { VerifyOTP } from "../../hooks/VerifyOTP"
import { api } from "../api"
import { UserOutput } from "./UserOutput"

export namespace OTPNotification {

    export const otpNotification = {

        requestOTP: (phoneNumber: string) => {
            const payload = {
                phoneNumber: phoneNumber
            }

            return api.post<void>('otp', payload, {skipAuth: true})
        } ,

        verifyOtp: (payload: VerifyOTP) => {
            return api.post<UserOutput>('otp/valid', payload, {skipAuth: true});
        }

    }

}