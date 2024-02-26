import { Component, OnInit, Input, HostBinding, EventEmitter, Output, input} from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { VoteDownAction, VoteResetAction, VoteUpAction } from '../../states/destinos-viajes/destinos-viajes.actions';

@Component({
  selector: 'app-destino-viaje',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, CommonModule, NgIf, RouterLink],
  templateUrl: './destino-viaje.component.html',
  styleUrl: './destino-viaje.component.css'
})
export class DestinoViajeComponent implements OnInit{

  @Input('idx') position: number = 0;
  @Input() destino: DestinoViaje = new DestinoViaje('','',false);
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
  }

  ngOnInit(): void {      
  }

  ir() {
    this.clicked.emit(this.destino);
    return false;
  }

  voteUp() {
    this.store.dispatch(VoteUpAction({destino: {
      ...this.destino,
      setSelected: function (value: boolean): void {
      },
      voteUp: function (): void {
      },
      voteDown: function (): void {
      },
      voteReset: function (): void {
      }
    }}))
    console.log(this.destino.votes);
    this.destino.votes ++;
    return false;
  }

  voteDown() {
    this.store.dispatch(VoteDownAction({destino: {
      ...this.destino,
      setSelected: function (value: boolean): void {
      },
      voteUp: function (): void {
      },
      voteDown: function (): void {
      },
      voteReset: function (): void {
      }
    }}))
    this.destino.votes --;
    console.log(this.destino.votes);
    return false;
  }

  voteReset() {
    this.store.dispatch(VoteResetAction({destino: {
      ...this.destino,
      voteUp: function () {
      },
      voteDown: function () {
      },
      voteReset: function () {
      },
      setSelected: function (value: boolean): void {
      }
    }}))
    console.log(this.destino.votes);
    this.destino.votes = 0;
    return false;
  }
  
}
