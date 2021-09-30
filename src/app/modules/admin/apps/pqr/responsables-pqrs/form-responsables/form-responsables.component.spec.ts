import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResponsablesComponent } from './form-responsables.component';

describe('FormResponsablesComponent', () => {
  let component: FormResponsablesComponent;
  let fixture: ComponentFixture<FormResponsablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResponsablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
