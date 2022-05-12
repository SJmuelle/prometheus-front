import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPreguntasReferenciacionFormComponent } from './listado-preguntas-referenciacion-form.component';

describe('ListadoPreguntasReferenciacionFormComponent', () => {
  let component: ListadoPreguntasReferenciacionFormComponent;
  let fixture: ComponentFixture<ListadoPreguntasReferenciacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPreguntasReferenciacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPreguntasReferenciacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
