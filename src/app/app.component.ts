import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DestinoViajeComponent } from './components/destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinoViaje } from './models/destino-viaje.model';
import { Observable } from 'rxjs';
import { ReservasModule } from './reservas/reservas.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DestinoViajeComponent,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    ReservasModule,
    HttpClientModule,
    TranslateModule,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-wishlist';
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  });

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    console.log('***************** get translation');
    this.translate.getTranslation('es').subscribe(x => console.log('x: ' + JSON.stringify(x)));
  }

  destinoAgregado(d: DestinoViaje) {
    //alert(d.nombre);
  }
}
