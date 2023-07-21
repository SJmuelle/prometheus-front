import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleExcepcionCreditoComponent } from './detalle-excepcion-credito.component';

describe('DetalleExcepcionCreditoComponent', () => {
  let component: DetalleExcepcionCreditoComponent;
  let fixture: ComponentFixture<DetalleExcepcionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleExcepcionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleExcepcionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
