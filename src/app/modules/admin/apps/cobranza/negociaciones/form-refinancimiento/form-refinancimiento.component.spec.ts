import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRefinancimientoComponent } from './form-refinancimiento.component';

describe('FormRefinancimientoComponent', () => {
  let component: FormRefinancimientoComponent;
  let fixture: ComponentFixture<FormRefinancimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRefinancimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRefinancimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
