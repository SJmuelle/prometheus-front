import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaFirmaDigitalComponent } from './grid-agenda-firma-digital.component';

describe('GridAgendaFirmaDigitalComponent', () => {
  let component: GridAgendaFirmaDigitalComponent;
  let fixture: ComponentFixture<GridAgendaFirmaDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaFirmaDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaFirmaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
