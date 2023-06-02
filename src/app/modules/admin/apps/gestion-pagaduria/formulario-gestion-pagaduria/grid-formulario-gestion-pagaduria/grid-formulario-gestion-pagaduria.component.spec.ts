import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFormularioGestionPagaduriaComponent } from './grid-formulario-gestion-pagaduria.component';

describe('GridFormularioGestionPagaduriaComponent', () => {
  let component: GridFormularioGestionPagaduriaComponent;
  let fixture: ComponentFixture<GridFormularioGestionPagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFormularioGestionPagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFormularioGestionPagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
