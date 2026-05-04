import { api } from "../api";
import { PoliticsOutput } from "./PoliticsOutput";
import { RequestSupportInput } from "./RequestSupportInput";
import { SystemInformationOutput } from "./SystemInformationOutput";
import { TermsOutput } from "./TermsOutput";

export namespace Settings {
    export const settings = {
        requestSupport: (input: RequestSupportInput) => {
            return api.post('settings/support', input, {skipAuth: true});
        },

        getInformation: () => {
            return api.get<SystemInformationOutput>('settings/system-information', {skipAuth: true});
        },
        getPrivacyPolitcs: () => {
            return api.get<PoliticsOutput[]>('settings/politics', {skipAuth: true});
        },
        getTerms: () => {
            return api.get<TermsOutput[]>('settings/terms', {skipAuth: true});
        },
        deleteUserAccount: (userId: string) => {
            return api.patch('settings/user/deactive', {userId: userId} , {skipAuth: true});
        }
    }
}