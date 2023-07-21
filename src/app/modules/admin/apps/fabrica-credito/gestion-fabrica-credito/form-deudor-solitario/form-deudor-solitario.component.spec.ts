import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeudorSolitarioComponent } from './form-deudor-solitario.component';

describe('FormDeudorSolitarioComponent', () => {
  let component: FormDeudorSolitarioComponent;
  let fixture: ComponentFixture<FormDeudorSolitarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDeudorSolitarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeudorSolitarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
