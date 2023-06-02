import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGestionPlazosComponent } from './listado-gestion-plazos.component';

describe('ListadoGestionPlazosComponent', () => {
  let component: ListadoGestionPlazosComponent;
  let fixture: ComponentFixture<ListadoGestionPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGestionPlazosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoGestionPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
