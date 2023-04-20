import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGestionPagaduriaComponent } from './formulario-gestion-pagaduria.component';

describe('FormularioGestionPagaduriaComponent', () => {
  let component: FormularioGestionPagaduriaComponent;
  let fixture: ComponentFixture<FormularioGestionPagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioGestionPagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGestionPagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
