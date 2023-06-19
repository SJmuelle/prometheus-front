import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAperturaComponent } from './formulario-apertura.component';

describe('FormularioAperturaComponent', () => {
  let component: FormularioAperturaComponent;
  let fixture: ComponentFixture<FormularioAperturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAperturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAperturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
