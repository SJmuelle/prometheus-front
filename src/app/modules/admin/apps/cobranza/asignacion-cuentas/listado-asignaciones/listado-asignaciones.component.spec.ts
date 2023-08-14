import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAsignacionesComponent } from './listado-asignaciones.component';

describe('ListadoAsignacionesComponent', () => {
  let component: ListadoAsignacionesComponent;
  let fixture: ComponentFixture<ListadoAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
