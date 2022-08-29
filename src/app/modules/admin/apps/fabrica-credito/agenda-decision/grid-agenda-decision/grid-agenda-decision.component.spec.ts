import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaDecisionComponent } from './grid-agenda-decision.component';

describe('GridAgendaDecisionComponent', () => {
  let component: GridAgendaDecisionComponent;
  let fixture: ComponentFixture<GridAgendaDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
