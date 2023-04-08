import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCodeudorComponent } from './form-codeudor.component';

describe('FormCodeudorComponent', () => {
  let component: FormCodeudorComponent;
  let fixture: ComponentFixture<FormCodeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCodeudorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCodeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
