import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendasVisitasComponent } from './grid-agendas-visitas.component';

describe('GridAgendasVisitasComponent', () => {
  let component: GridAgendasVisitasComponent;
  let fixture: ComponentFixture<GridAgendasVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendasVisitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendasVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
