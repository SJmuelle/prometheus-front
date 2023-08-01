import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcepcionCreditoComponent } from './modal-excepcion-credito.component';

describe('ModalExcepcionCreditoComponent', () => {
  let component: ModalExcepcionCreditoComponent;
  let fixture: ComponentFixture<ModalExcepcionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcepcionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExcepcionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
