import { Component, EventEmitter, Inject, OnInit, Output, forwardRef } from '@angular/core';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { NgFor, NgIf } from '@angular/common';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AjaxResponse, ajax } from 'rxjs/ajax';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'app-form-destino-viaje',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './form-destino-viaje.component.html',
  styleUrl: './form-destino-viaje.component.css'
})
export class FormDestinoViajeComponent implements OnInit{
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  public fg! : FormGroup
  minLongitud = 5;
  searchResults: any[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) {
    this.searchResults = [];
    this.onItemAdded = new EventEmitter();

    this.fg = new FormGroup({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
/*         this.nombreValidator,*/
         this.nombreValidatorParametrizable(this.minLongitud)
      ])),
      url: new FormControl('')
    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambió el formulario', form)
    })
  }

  ngOnInit() {
    let elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
    .pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
    switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
    ).subscribe(ajaxResponse => this.searchResults = ajaxResponse.response as string[]);
  }

  guardar(nombre:string, url:string):boolean {
    let d:DestinoViaje = new DestinoViaje (nombre, url, false);
    this.onItemAdded.emit(d);
    return false;
  }  

/*   nombreValidator(control: FormControl): { [s:string]: boolean } {
    const l = control.value.toString().trim().length;
    if (l > 0 && l < 5) {
      return { invalidNombre: true };
    }
     else {
      return {invalidNombre: false};
     }
  } */

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }
      return null;
    };
  }
}
