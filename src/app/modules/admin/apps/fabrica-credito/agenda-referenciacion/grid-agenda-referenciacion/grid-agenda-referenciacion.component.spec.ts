import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaReferenciacionComponent } from './grid-agenda-referenciacion.component';

describe('GridAgendaReferenciacionComponent', () => {
  let component: GridAgendaReferenciacionComponent;
  let fixture: ComponentFixture<GridAgendaReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
