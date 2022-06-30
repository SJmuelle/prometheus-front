import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarCapacidadPagoComponent } from './rechazar-capacidad-pago.component';

describe('RechazarCapacidadPagoComponent', () => {
  let component: RechazarCapacidadPagoComponent;
  let fixture: ComponentFixture<RechazarCapacidadPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechazarCapacidadPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechazarCapacidadPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
