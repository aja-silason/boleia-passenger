import { api } from "@/app/infra/service/api";
import { AtributePasswordInput } from "../../hooks/AtributePasswordInput";
import { AuthInput } from "../../hooks/AuthInput";
import { ChangePasswordInput } from "../../hooks/ChangePasswordInput";
import { FCMTokenInput } from "../../hooks/FCMTokenInput";
import { ReplacePasswordInput } from "../../hooks/ReplacePasswordInput";
import { SignUpInput } from "../../hooks/SignUpInput";
import { LoginOutput, UserOutput } from "./UserOutput";

export namespace  Auth {

    export const auth = {

        login: (input: AuthInput) => {
            return api.post<LoginOutput>('auth/driver/signin', input, {skipAuth: true})
        },

        signUp: (input: SignUpInput) => {
            return api.post<UserOutput>('driver', input, {skipAuth: true})
        },

        recoveryPassword: (input: ChangePasswordInput) => {
            return api.patch<boolean>('auth/driver/recovery-password', input, {skipAuth: true})
        },

        changePassword: (input: ReplacePasswordInput) => {
            return api.patch<boolean>('auth/driver/' + input?.driverId +'change-password', input, {skipAuth: true})
        },

        atributePassword: (input: AtributePasswordInput) => {
            return api.patch<boolean>('auth/driver/atribute-password', input, {skipAuth: true})
        },

        addFCMToken: (input: FCMTokenInput) => {
            return api.patch<void>('user/fcm', input, {skipAuth: true})
        }

    }

}