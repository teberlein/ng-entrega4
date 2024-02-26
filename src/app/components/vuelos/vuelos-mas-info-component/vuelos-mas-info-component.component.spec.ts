import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosMasInfoComponentComponent } from './vuelos-mas-info-component.component';

describe('VuelosMasInfoComponentComponent', () => {
  let component: VuelosMasInfoComponentComponent;
  let fixture: ComponentFixture<VuelosMasInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VuelosMasInfoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VuelosMasInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
