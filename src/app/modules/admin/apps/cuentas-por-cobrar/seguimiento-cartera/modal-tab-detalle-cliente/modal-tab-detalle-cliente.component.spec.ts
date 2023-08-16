import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTabDetalleClienteComponent } from './modal-tab-detalle-cliente.component';

describe('ModalTabDetalleClienteComponent', () => {
  let component: ModalTabDetalleClienteComponent;
  let fixture: ComponentFixture<ModalTabDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTabDetalleClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTabDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
