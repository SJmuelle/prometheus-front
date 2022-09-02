import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaFormalizacionComponent } from './grid-agenda-formalizacion.component';

describe('GridAgendaFormalizacionComponent', () => {
  let component: GridAgendaFormalizacionComponent;
  let fixture: ComponentFixture<GridAgendaFormalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaFormalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaFormalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
