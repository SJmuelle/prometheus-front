import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleHistorialComponent } from './detalle-historial.component';

describe('DetalleHistorialComponent', () => {
  let component: DetalleHistorialComponent;
  let fixture: ComponentFixture<DetalleHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
