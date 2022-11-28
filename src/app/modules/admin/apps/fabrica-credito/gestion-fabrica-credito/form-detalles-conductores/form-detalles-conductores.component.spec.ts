import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetallesConductoresComponent } from './form-detalles-conductores.component';

describe('FormDetallesConductoresComponent', () => {
  let component: FormDetallesConductoresComponent;
  let fixture: ComponentFixture<FormDetallesConductoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetallesConductoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDetallesConductoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
