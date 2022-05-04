import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionReferenciacionModalComponent } from './form-gestion-referenciacion-modal.component';

describe('FormGestionReferenciacionModalComponent', () => {
  let component: FormGestionReferenciacionModalComponent;
  let fixture: ComponentFixture<FormGestionReferenciacionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestionReferenciacionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionReferenciacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
