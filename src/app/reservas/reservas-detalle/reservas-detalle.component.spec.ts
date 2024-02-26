import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasDetalleComponent } from './reservas-detalle.component';

describe('ReservasDetalleComponent', () => {
  let component: ReservasDetalleComponent;
  let fixture: ComponentFixture<ReservasDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
