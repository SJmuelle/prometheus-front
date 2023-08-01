import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailsCarteraClienteComponent } from './modal-details-cartera-cliente.component';

describe('ModalDetailsCarteraClienteComponent', () => {
  let component: ModalDetailsCarteraClienteComponent;
  let fixture: ComponentFixture<ModalDetailsCarteraClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetailsCarteraClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailsCarteraClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
