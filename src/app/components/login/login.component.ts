import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  mensajeError: string;

  constructor(public authService: AuthService) {
    this.mensajeError = '';
  }

  ngOnInit() {
    console.log(this.authService.getUser() != undefined);
    console.log(this.authService.getUser()?.valueOf);
    
  }

/*   login(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) {
      this.mensajeError = 'Login incorrecto.';
      setTimeout(function() {
        this.mensajeError = '';
      }.bind(this), 2500);
    }
    return false;
  } */

  login(username: string, password: string): boolean {
    this.mensajeError = '';
    if (!this.authService.login(username, password)) {
        this.mensajeError = 'Login incorrecto.';
        setTimeout(() => {
            this.mensajeError = '';
        }, 2500);
    }
    return false;
}

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}
