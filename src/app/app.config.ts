import { APP_INITIALIZER, ApplicationConfig, Injectable, InjectionToken, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DestinosApiClient } from './models/destinos-api-client.model'

import { routes } from './app.routes';
import { Store, provideState, provideStore } from '@ngrx/store';
import { reducerDestinosViajes } from './states/destinos-viajes/destinos-viajes.reducer';
import { provideEffects } from '@ngrx/effects';
import { DestinosViajesEffects } from './states/destinos-viajes/destinos-viajes.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AppState } from './states/app.state';
import { InitMyDataAction } from './states/destinos-viajes/destinos-viajes.actions';
import Dexie from 'dexie';
import { DestinoViaje } from './models/destino-viaje.model';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable, flatMap, from } from 'rxjs';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// app config
export interface AppConfig {
  apiEndpoint: String;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

/* // app init
export function init_app(appLoadService: AppLoadService): () => Promise<any>  {
  return () => appLoadService.intializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) { }
  async intializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndpoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(InitMyDataAction(response.body));
  }
}
// fin app init */

// dexie db
export class Translation {
  constructor(public id: number, public lang: string, public key: string, public value: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {
  destinos!: Dexie.Table<DestinoViaje, number>;
  translations!: Dexie.Table<Translation, number>;
  constructor () {
      super('MyDatabase');
      this.version(1).stores({
        destinos: '++id, nombre, imagenUrl'
      });
      this.version(2).stores({
        destinos: '++id, nombre, imagenUrl',
        translations: '++id, lang, key, value'
      });
  }
}

export const db = new MyDatabase();
// fin dexie db

// i18n ini
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
    .where('lang')
    .equals(lang)
    .toArray()
    .then(results => {
      if (results.length === 0) {
        return this.http
        .get<Translation[]>(APP_CONFIG_VALUE.apiEndpoint + '/api/translation?lang=' + lang)
        .toPromise()
        .then(apiResults => {
          db.translations.bulkAdd(apiResults!);
          return apiResults;
        });
      }
      return results;
    }).then((traducciones) => {
      console.log('traducciones cargadas:');
      console.log(traducciones);
      return traducciones;
    }).then((traducciones) => {
      return traducciones!.map((t) => ({ [t.key]: t.value}));
    });
   return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
// fin i18n



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'destinos', reducer: reducerDestinosViajes }),
    provideEffects(DestinosViajesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService,
    UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE },
/*      AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true }, */
    MyDatabase,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        }
      })
    )
  ]
};
