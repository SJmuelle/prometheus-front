import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaVentaComponent } from './grid-agenda-venta.component';

describe('GridAgendaVentaComponent', () => {
  let component: GridAgendaVentaComponent;
  let fixture: ComponentFixture<GridAgendaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
