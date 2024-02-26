import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasApiClientService } from './reservas-api-client.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReservasRoutingModule
  ],
  providers: [
    ReservasApiClientService
  ]
})
export class ReservasModule { }
