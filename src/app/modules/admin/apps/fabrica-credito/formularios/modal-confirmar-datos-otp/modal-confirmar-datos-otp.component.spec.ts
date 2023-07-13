import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarDatosOTPComponent } from './modal-confirmar-datos-otp.component';

describe('ModalConfirmarDatosOTPComponent', () => {
  let component: ModalConfirmarDatosOTPComponent;
  let fixture: ComponentFixture<ModalConfirmarDatosOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmarDatosOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmarDatosOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
