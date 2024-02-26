import { createReducer, on } from "@ngrx/store";
import { ElegidoFavoritoAction, NuevoDestinoAction } from "./destinos-viajes.actions";
import { DestinoViaje } from "../../models/destino-viaje.model";
import * as DestinosViajesActions from './destinos-viajes.actions'

 // ESTADO
 export interface DestinosViajesState {
    items: DestinoViaje[];
    loading: boolean;
    favorito: DestinoViaje | null;
}

export const initialState: DestinosViajesState = {
    items: [],
    loading: false,
    favorito: null
};


 // REDUCERS
 export const reducerDestinosViajes = createReducer(
    initialState,
    on(DestinosViajesActions.NuevoDestinoAction, (state, { destino }) => ({...state, items: [...state.items, destino]})),
    on(DestinosViajesActions.ElegidoFavoritoAction, (state, { destino }) => {
        state.items.forEach(x => x.setSelected(false));
            const fav:DestinoViaje = destino;
            fav.setSelected(true);
            return {
                ...state,
                favorito: fav
            };
    }),
    on(DestinosViajesActions.VoteUpAction, (state, { destino }) => {

        destino.voteUp()
        return({ ...state })
    }),
    
    on(DestinosViajesActions.VoteDownAction, (state, { destino }) => {
        destino.voteDown()
        return({ ...state })
    }),
    on(DestinosViajesActions.VoteResetAction, (state, { destino }) => {
        destino.voteReset()
        return({...state})
    }),
    on(DestinosViajesActions.InitMyDataAction, (state, { destinos }) => {
        return({
            ...state,
            items: destinos.map((d) => new DestinoViaje(d, '',true))
        })
    }),
)
