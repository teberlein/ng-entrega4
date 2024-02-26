import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DestinosViajesActionTypes, ElegidoFavoritoAction } from "./destinos-viajes.actions";
import { map } from "rxjs";
import * as DestinosViajesActions from './destinos-viajes.actions'

// EFFECTS
@Injectable()

export class DestinosViajesEffects {
    
    nuevoagregado$ = createEffect(() => 
        this.actions$.pipe(
            ofType(DestinosViajesActions.NuevoDestinoAction),
            map((destino) => DestinosViajesActions.ElegidoFavoritoAction(destino))
        ),
    );
 
   constructor(
     private actions$: Actions,
   ) {}
 }