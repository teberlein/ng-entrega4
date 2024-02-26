import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosComponentComponent } from './vuelos-component.component';

describe('VuelosComponentComponent', () => {
  let component: VuelosComponentComponent;
  let fixture: ComponentFixture<VuelosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VuelosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
