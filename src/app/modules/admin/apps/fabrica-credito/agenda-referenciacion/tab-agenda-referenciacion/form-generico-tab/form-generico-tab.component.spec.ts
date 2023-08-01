import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGenericoTabComponent } from './form-generico-tab.component';

describe('FormGenericoTabComponent', () => {
  let component: FormGenericoTabComponent;
  let fixture: ComponentFixture<FormGenericoTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGenericoTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGenericoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
