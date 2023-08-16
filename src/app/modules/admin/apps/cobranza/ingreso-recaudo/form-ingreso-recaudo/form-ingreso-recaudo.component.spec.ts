import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngresoRecaudoComponent } from './form-ingreso-recaudo.component';

describe('FormIngresoRecaudoComponent', () => {
  let component: FormIngresoRecaudoComponent;
  let fixture: ComponentFixture<FormIngresoRecaudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIngresoRecaudoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIngresoRecaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
