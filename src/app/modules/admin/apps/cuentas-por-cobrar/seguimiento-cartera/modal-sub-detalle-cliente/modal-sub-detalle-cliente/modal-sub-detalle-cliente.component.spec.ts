import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubDetalleClienteComponent } from './modal-sub-detalle-cliente.component';

describe('ModalSubDetalleClienteComponent', () => {
  let component: ModalSubDetalleClienteComponent;
  let fixture: ComponentFixture<ModalSubDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSubDetalleClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
