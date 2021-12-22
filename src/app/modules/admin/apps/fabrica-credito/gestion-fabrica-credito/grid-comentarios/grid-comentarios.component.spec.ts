import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComentariosComponent } from './grid-comentarios.component';

describe('GridComentariosComponent', () => {
  let component: GridComentariosComponent;
  let fixture: ComponentFixture<GridComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridComentariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
