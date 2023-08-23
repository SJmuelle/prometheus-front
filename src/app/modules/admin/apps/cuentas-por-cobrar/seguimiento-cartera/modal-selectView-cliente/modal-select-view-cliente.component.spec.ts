import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectViewClienteComponent } from './modal-select-view-cliente.component';

describe('ModalSelectViewClienteComponent', () => {
  let component: ModalSelectViewClienteComponent;
  let fixture: ComponentFixture<ModalSelectViewClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectViewClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectViewClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
