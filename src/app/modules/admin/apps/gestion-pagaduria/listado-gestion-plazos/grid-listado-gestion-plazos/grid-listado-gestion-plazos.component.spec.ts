import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListadoGestionPlazosComponent } from './grid-listado-gestion-plazos.component';

describe('GridListadoGestionPlazosComponent', () => {
  let component: GridListadoGestionPlazosComponent;
  let fixture: ComponentFixture<GridListadoGestionPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridListadoGestionPlazosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListadoGestionPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
