import { SearchTravels } from "../../hooks/travel/SearchTravels";
import { api } from "../api";
import { TravelOutput } from "./TravelOutput";

export namespace Travel {
    export const travel = {
        findAllTravel: (id: string) => {
            return api.get<TravelOutput[]>('travels/driver/'+id, {skipAuth: true});
        },

        searchTravel: (payload: SearchTravels) => {
            return api.get<TravelOutput[]>(`travels/search?location=${payload.location}&seats=${payload.seats}`, {skipAuth: true});
        },

        findByTravelId: (id: string) => {
            return api.get<TravelOutput>('travels/'+id, {skipAuth: true});
        }
    }
}