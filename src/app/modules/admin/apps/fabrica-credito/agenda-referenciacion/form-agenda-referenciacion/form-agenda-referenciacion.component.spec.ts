import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgendaReferenciacionComponent } from './form-agenda-referenciacion.component';

describe('FormAgendaReferenciacionComponent', () => {
  let component: FormAgendaReferenciacionComponent;
  let fixture: ComponentFixture<FormAgendaReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAgendaReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAgendaReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
