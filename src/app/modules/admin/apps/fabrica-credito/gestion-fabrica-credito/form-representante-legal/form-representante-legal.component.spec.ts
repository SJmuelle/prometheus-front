import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepresentanteLegalComponent } from './form-representante-legal.component';

describe('FormRepresentanteLegalComponent', () => {
  let component: FormRepresentanteLegalComponent;
  let fixture: ComponentFixture<FormRepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRepresentanteLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
