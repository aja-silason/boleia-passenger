import { ResgisterTravelInput } from "../../hooks/travel/RegisterTravelInput";
import { RequestTravelInput } from "../../hooks/travel/RequestTravelInput";
import { api } from "../api";
import { TravelOutput } from "./TravelOutput";

export namespace Travel {
    export const travel = {
        findAllTravel: (id: string) => {
            return api.get<TravelOutput[]>('travels/driver/'+id, {skipAuth: true});
        },

        findByTravelId: (id: string) => {
            return api.get<TravelOutput>('travels/'+id, {skipAuth: true});
        },

        register: (input: ResgisterTravelInput) => {
            return api.post('travels', input, {skipAuth: true});
        },

        accept: (input: RequestTravelInput) => {
            return api.patch('travels/request/approve', input, {skipAuth: true});
        },

        refuse: (input: RequestTravelInput) => {
            return api.patch('travels/request/refuse', input, {skipAuth: true});
        },

        start: (id: string) => {
            return api.patch('travels/'+ id +'/start', {skipAuth: true});
        },

        finish: (id: string) => {
            return api.patch('travels/'+ id +'/finish', {skipAuth: true});
        }
    }
}