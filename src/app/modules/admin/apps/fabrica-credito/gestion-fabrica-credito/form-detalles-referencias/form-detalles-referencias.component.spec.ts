import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDetallesReferenciasComponent } from './form-detalles-referencias.component';

describe('FormDetallesReferenciasComponent', () => {
  let component: FormDetallesReferenciasComponent;
  let fixture: ComponentFixture<FormDetallesReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDetallesReferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDetallesReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
