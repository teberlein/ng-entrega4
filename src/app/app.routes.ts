import { Routes, RouterModule } from '@angular/router';
import { ListaDestinosComponent } from './components/lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './components/destino-detalle/destino-detalle.component';
import { LoginComponent } from './components/login/login.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosMainComponentComponent } from './components/vuelos/vuelos-main-component/vuelos-main-component.component';
import { VuelosDetalleComponent } from './components/vuelos/vuelos-detalle-component/vuelos-detalle-component.component';
import { VuelosComponentComponent } from './components/vuelos/vuelos-component/vuelos-component.component';
import { VuelosMasInfoComponentComponent } from './components/vuelos/vuelos-mas-info-component/vuelos-mas-info-component.component';
import { ReservasListadoComponent } from './reservas/reservas-listado/reservas-listado.component';
import { ReservasDetalleComponent } from './reservas/reservas-detalle/reservas-detalle.component';

export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetalleComponent },
]

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: ListaDestinosComponent},
    { path: 'destino', component: DestinoDetalleComponent},
    { path: 'login', component: LoginComponent },
    {
      path: 'protected',
      component: ProtectedComponent,
      canActivate: [ UsuarioLogueadoGuard ]
    },
    {
      path: 'vuelos',
      component: VuelosComponentComponent,
      canActivate: [ UsuarioLogueadoGuard ],
      children: childrenRoutesVuelos
    },
    { path: 'reservas',  component: ReservasListadoComponent },
    { path: 'reservas/:id',  component: ReservasDetalleComponent }
];