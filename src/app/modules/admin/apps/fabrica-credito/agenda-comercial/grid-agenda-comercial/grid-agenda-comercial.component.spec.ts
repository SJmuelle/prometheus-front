import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaComercialComponent } from './grid-agenda-comercial.component';

describe('GridAgendaComercialComponent', () => {
  let component: GridAgendaComercialComponent;
  let fixture: ComponentFixture<GridAgendaComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
