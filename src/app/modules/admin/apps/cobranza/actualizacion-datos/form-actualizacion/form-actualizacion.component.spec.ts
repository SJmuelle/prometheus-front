import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActualizacionComponent } from './form-actualizacion.component';

describe('FormActualizacionComponent', () => {
  let component: FormActualizacionComponent;
  let fixture: ComponentFixture<FormActualizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActualizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
