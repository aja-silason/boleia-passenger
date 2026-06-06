import { api } from "@/app/infra/service/api"
import { VerifyOTP } from "../../hooks/VerifyOTP"


export namespace OTPNotification {

    export const otpNotification = {

        requestOTP: (phoneNumber: string) => {
            const payload = {
                phoneNumber: phoneNumber
            }

            return api.post<void>('otp', payload, {skipAuth: true})
        } ,

        verifyOtp: (payload: VerifyOTP) => {

            const verify = (key: keyof VerifyOTP): string => {
                const map: Record<keyof VerifyOTP | any, string> = {
                    phoneNumber: "Número de telefone",
                    otp: "OTP"
                }
                return map[key] || key;
            }

            return api.post<void>('otp/valid', payload, {skipAuth: true});
        }

    }

}