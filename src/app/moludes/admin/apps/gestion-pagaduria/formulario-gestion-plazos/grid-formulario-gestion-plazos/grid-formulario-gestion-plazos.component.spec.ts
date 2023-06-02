import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFormularioGestionPlazosComponent } from './grid-formulario-gestion-plazos.component';

describe('GridFormularioGestionPlazosComponent', () => {
  let component: GridFormularioGestionPlazosComponent;
  let fixture: ComponentFixture<GridFormularioGestionPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFormularioGestionPlazosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFormularioGestionPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
