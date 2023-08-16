import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActualizacionDataComponent } from './form-actualizacion-data.component';

describe('FormActualizacionDataComponent', () => {
  let component: FormActualizacionDataComponent;
  let fixture: ComponentFixture<FormActualizacionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActualizacionDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActualizacionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
