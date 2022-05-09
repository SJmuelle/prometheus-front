import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPreguntasReferenciacionComponent } from './listado-preguntas-referenciacion.component';

describe('ListadoPreguntasReferenciacionComponent', () => {
  let component: ListadoPreguntasReferenciacionComponent;
  let fixture: ComponentFixture<ListadoPreguntasReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPreguntasReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPreguntasReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
