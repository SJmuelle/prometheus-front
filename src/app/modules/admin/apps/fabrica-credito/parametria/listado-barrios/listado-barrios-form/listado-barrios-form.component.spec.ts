import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBarriosFormComponent } from './listado-barrios-form.component';

describe('ListadoBarriosFormComponent', () => {
  let component: ListadoBarriosFormComponent;
  let fixture: ComponentFixture<ListadoBarriosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoBarriosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoBarriosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
