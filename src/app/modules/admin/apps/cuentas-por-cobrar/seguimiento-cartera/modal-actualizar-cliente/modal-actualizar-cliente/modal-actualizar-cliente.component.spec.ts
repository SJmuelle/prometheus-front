import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActualizarClienteComponent } from './modal-actualizar-cliente.component';

describe('ModalActualizarClienteComponent', () => {
  let component: ModalActualizarClienteComponent;
  let fixture: ComponentFixture<ModalActualizarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActualizarClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActualizarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
