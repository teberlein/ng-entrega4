import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDestinoViajeComponent } from './form-destino-viaje.component';

describe('FormDestinoViajeComponent', () => {
  let component: FormDestinoViajeComponent;
  let fixture: ComponentFixture<FormDestinoViajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDestinoViajeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDestinoViajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
