import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTiposComentariosFormComponent } from './listado-tipos-comentarios-form.component';

describe('ListadoTiposComentariosFormComponent', () => {
  let component: ListadoTiposComentariosFormComponent;
  let fixture: ComponentFixture<ListadoTiposComentariosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoTiposComentariosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoTiposComentariosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
