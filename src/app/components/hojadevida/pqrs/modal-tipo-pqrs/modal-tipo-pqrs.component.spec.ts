import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTipoPqrsComponent } from './modal-tipo-pqrs.component';

describe('ModalTipoPqrsComponent', () => {
  let component: ModalTipoPqrsComponent;
  let fixture: ComponentFixture<ModalTipoPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTipoPqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTipoPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
