import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vuelos-component',
  standalone: true,
  imports: [ RouterLink, RouterOutlet ],
  templateUrl: './vuelos-component.component.html',
  styleUrl: './vuelos-component.component.css'
})
export class VuelosComponentComponent {

}
