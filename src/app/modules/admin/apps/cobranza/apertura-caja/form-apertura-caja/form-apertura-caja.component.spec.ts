import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAperturaCajaComponent } from './form-apertura-caja.component';

describe('FormAperturaCajaComponent', () => {
  let component: FormAperturaCajaComponent;
  let fixture: ComponentFixture<FormAperturaCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAperturaCajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAperturaCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
