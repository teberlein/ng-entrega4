import { BehaviorSubject, Observer, Subject } from 'rxjs';
import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../states/destinos-viajes/destinos-viajes.actions';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { APP_CONFIG, AppConfig, db } from '../app.config';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEvent } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[];
	current: Subject<DestinoViaje | null> = new BehaviorSubject<DestinoViaje | null>(null);
	constructor(
		private store: Store<AppState>,
		@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
		private http: HttpClient
	  ) {
		this.destinos = []
	}
	add(d: DestinoViaje) {
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
		this.http.request(req).subscribe((event: HttpEvent<unknown>) => {
			if (event instanceof HttpResponse) {
			  // Solo manejar respuestas exitosas (código 200)
			  if (event.status === 200) {
				this.store.dispatch(NuevoDestinoAction({destino: {
					...d,
					voteUp: function () {
					},
					voteDown: function () {
					},
					setSelected: function (value: boolean): void {
					},
					voteReset: function (): void {
					}
				}}));

				this.destinos.push(d);
				const myDb = db;
				myDb.destinos.add(d);
				console.log('todos los destinos de la db!');
				myDb.destinos.toArray().then(destinos => console.log(destinos))
			  }
		}});
	  }
	getAll(): DestinoViaje[]{
		return this.destinos;
	}
	async getDestinos() {
		const res = await fetch('http://localhost:3000/my');
		const resjson = (await res).json()
		return resjson
	}
	getById(id: String): DestinoViaje {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	  }
	elegir(d:DestinoViaje) {
		this.destinos.forEach(x => x.setSelected(false));
		d.setSelected(true);
		this.current.next(d);
	}
	subscribeOnChange(fn: any) {
		this.current.subscribe(fn);
	}

}