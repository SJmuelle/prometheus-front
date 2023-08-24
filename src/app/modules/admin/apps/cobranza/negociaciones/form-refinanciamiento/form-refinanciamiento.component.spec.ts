import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRefinanciamientoComponent } from './form-refinanciamiento.component';

describe('FormRefinanciamientoComponent', () => {
  let component: FormRefinanciamientoComponent;
  let fixture: ComponentFixture<FormRefinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRefinanciamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRefinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
