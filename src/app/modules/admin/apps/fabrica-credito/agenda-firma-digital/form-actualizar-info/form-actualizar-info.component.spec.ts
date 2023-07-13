import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActualizarInfoComponent } from './form-actualizar-info.component';

describe('FormActualizarInfoComponent', () => {
  let component: FormActualizarInfoComponent;
  let fixture: ComponentFixture<FormActualizarInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActualizarInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActualizarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
