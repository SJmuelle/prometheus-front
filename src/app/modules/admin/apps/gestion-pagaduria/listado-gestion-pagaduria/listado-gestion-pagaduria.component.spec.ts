import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoGestionPagaduriaComponent } from './listado-gestion-pagaduria.component';

describe('ListadoGestionPagaduriaComponent', () => {
  let component: ListadoGestionPagaduriaComponent;
  let fixture: ComponentFixture<ListadoGestionPagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoGestionPagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoGestionPagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
