import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleFirmaDigitalComponent } from './modal-detalle-firma-digital.component';

describe('ModalDetalleFirmaDigitalComponent', () => {
  let component: ModalDetalleFirmaDigitalComponent;
  let fixture: ComponentFixture<ModalDetalleFirmaDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetalleFirmaDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleFirmaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
