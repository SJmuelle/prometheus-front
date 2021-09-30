import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolucionesComponent } from './form-soluciones.component';

describe('FormSolucionesComponent', () => {
  let component: FormSolucionesComponent;
  let fixture: ComponentFixture<FormSolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSolucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
