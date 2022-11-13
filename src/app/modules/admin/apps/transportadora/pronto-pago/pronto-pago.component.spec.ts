import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProntoPagoComponent } from './pronto-pago.component';

describe('ProntoPagoComponent', () => {
  let component: ProntoPagoComponent;
  let fixture: ComponentFixture<ProntoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProntoPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProntoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
