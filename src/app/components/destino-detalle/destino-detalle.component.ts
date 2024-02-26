import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [],
  templateUrl: './destino-detalle.component.html',
  styleUrl: './destino-detalle.component.css',
  providers: [
    DestinosApiClient
  ] 
})
export class DestinoDetalleComponent implements OnInit{
  destino: DestinoViaje | null;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) {
    this.destino = null;
  }

  ngOnInit() {
     let id = this.route.snapshot.paramMap.get('id');
     this.destino = this.destinosApiClient.getById('1')
  }
}
