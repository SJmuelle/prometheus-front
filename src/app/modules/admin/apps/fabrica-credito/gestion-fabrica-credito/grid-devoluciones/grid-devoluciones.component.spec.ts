import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDevolucionesComponent } from './grid-devoluciones.component';

describe('GridDevolucionesComponent', () => {
  let component: GridDevolucionesComponent;
  let fixture: ComponentFixture<GridDevolucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDevolucionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDevolucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
