import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListadoGestionPagaduriaComponent } from './grid-listado-gestion-pagaduria.component';

describe('GridListadoGestionPagaduriaComponent', () => {
  let component: GridListadoGestionPagaduriaComponent;
  let fixture: ComponentFixture<GridListadoGestionPagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridListadoGestionPagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListadoGestionPagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
