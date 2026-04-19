import { SearchTravels } from "../../hooks/travel/SearchTravels";
import { api } from "../api";
import { CancelTravelRequest } from "./CancelTravelRequest";
import { TravelOutput } from "./TravelOutput";
import { TravelRequest } from "./TravelRequest";

export namespace Travel {
    export const travel = {
        findAllTravel: (id: string) => {
            return api.get<TravelOutput[]>('travels/passanger/'+id, {skipAuth: true});
        },

        searchTravel: (payload: SearchTravels) => {
            return api.get<TravelOutput[]>("travels/search", {
                params: {
                    location: payload.location,
                    seats: payload.seats
                },
                skipAuth: true
            });
        },

        requestTravel: (payload: TravelRequest) => {
            return api.post<TravelOutput[]>('travels/request', payload, {skipAuth: true});
        },

        cancelRequestTravel: (payload: CancelTravelRequest) => {
            return api.post<void>('travels/cancel', payload, {skipAuth: true});
        },
        findByTravelId: (id: string) => {
            return api.get<TravelOutput>('travels/'+id, {skipAuth: true});
        }
    }
}