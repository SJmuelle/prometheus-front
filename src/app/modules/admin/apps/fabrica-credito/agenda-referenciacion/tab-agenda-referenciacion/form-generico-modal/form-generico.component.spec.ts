import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenericoComponent } from './form-generico.component';

describe('FormGenericoComponent', () => {
  let component: FormGenericoComponent;
  let fixture: ComponentFixture<FormGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGenericoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
