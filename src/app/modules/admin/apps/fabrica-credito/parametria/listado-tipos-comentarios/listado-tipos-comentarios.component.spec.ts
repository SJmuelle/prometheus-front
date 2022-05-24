import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposComentariosComponent } from './listado-tipos-comentarios.component';

describe('ListadoTiposComentariosComponent', () => {
  let component: ListadoTiposComentariosComponent;
  let fixture: ComponentFixture<ListadoTiposComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTiposComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTiposComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
