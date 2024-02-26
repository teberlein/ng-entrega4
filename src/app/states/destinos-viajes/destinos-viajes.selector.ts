import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state"

export const selectDestinosViajesState = (state: AppState) => state.destinos;

export const selectFavorito = createSelector(
    selectDestinosViajesState,
    (state) => state.favorito
)

export const selectItems = createSelector(
    selectDestinosViajesState,
    (state) => state.items
)