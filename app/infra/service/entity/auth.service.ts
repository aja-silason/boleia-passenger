import { AuthInput } from "../../hooks/AuthInput";
import { SignUpInput } from "../../hooks/SignUpInput";
import { api } from "../api";
import { LoginOutput, UserOutput } from "./UserOutput";

export namespace  Auth {

    export const auth = {

        login: (input: AuthInput) => {
            return api.post<LoginOutput>('user/signin', input, {skipAuth: true})
        },

        addPassword: (input: AuthInput) => {
            return api.post<LoginOutput>('user/passanger-password', input, {skipAuth: true})
        },

        signUp: (input: SignUpInput) => {
            return api.post<UserOutput>('user', input, {skipAuth: true})
        }
    }

}