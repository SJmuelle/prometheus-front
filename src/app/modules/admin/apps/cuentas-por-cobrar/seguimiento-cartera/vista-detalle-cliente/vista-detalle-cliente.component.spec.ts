import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDetalleClienteComponent } from './vista-detalle-cliente.component';

describe('VistaDetalleClienteComponent', () => {
  let component: VistaDetalleClienteComponent;
  let fixture: ComponentFixture<VistaDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDetalleClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
