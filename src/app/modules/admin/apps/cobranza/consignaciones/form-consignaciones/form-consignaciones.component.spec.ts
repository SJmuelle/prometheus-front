import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsignacionesComponent } from './form-consignaciones.component';

describe('FormConsignacionesComponent', () => {
  let component: FormConsignacionesComponent;
  let fixture: ComponentFixture<FormConsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormConsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
