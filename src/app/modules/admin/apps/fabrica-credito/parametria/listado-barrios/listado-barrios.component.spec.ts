import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoBarriosComponent } from './listado-barrios.component';

describe('ListadoBarriosComponent', () => {
  let component: ListadoBarriosComponent;
  let fixture: ComponentFixture<ListadoBarriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoBarriosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoBarriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
