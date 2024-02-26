import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReservasApiClientService } from '../reservas-api-client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [ RouterLink, CommonModule],
  templateUrl: './reservas-listado.component.html',
  styleUrl: './reservas-listado.component.css'
})
export class ReservasListadoComponent implements OnInit{

  constructor( public api: ReservasApiClientService) { }

  ngOnInit(): void {
  }
}
