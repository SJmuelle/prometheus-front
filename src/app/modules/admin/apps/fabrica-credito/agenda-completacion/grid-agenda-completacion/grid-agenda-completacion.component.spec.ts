import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaCompletacionComponent } from './grid-agenda-completacion.component';

describe('GridAgendaCompletacionComponent', () => {
  let component: GridAgendaCompletacionComponent;
  let fixture: ComponentFixture<GridAgendaCompletacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaCompletacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaCompletacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
