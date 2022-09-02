import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaCarteraComponent } from './grid-agenda-cartera.component';

describe('GridAgendaCarteraComponent', () => {
  let component: GridAgendaCarteraComponent;
  let fixture: ComponentFixture<GridAgendaCarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaCarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaCarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
