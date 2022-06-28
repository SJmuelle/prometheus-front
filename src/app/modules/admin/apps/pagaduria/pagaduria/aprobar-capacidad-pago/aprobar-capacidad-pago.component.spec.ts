import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarCapacidadPagoComponent } from './aprobar-capacidad-pago.component';

describe('AprobarCapacidadPagoComponent', () => {
  let component: AprobarCapacidadPagoComponent;
  let fixture: ComponentFixture<AprobarCapacidadPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobarCapacidadPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarCapacidadPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
