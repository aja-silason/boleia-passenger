import { AtributePasswordInput } from "../../hooks/AtributePasswordInput";
import { AuthInput } from "../../hooks/AuthInput";
import { ChangePasswordInput } from "../../hooks/ChangePasswordInput";
import { SignUpInput } from "../../hooks/SignUpInput";
import { api } from "../api";
import { LoginOutput, UserOutput } from "./UserOutput";

export namespace  Auth {

    export const auth = {

        login: (input: AuthInput) => {
            return api.post<LoginOutput>('auth/driver/signin', input, {skipAuth: true})
        },

        signUp: (input: SignUpInput) => {
            return api.post<UserOutput>('driver', input, {skipAuth: true})
        },

        changePassword: (input: ChangePasswordInput) => {
            return api.patch<boolean>('auth/driver/recovery-password', input, {skipAuth: true})
        },

        atributePassword: (input: AtributePasswordInput) => {
            return api.patch<boolean>('auth/driver/atribute-password', input, {skipAuth: true})
        }

    }

}