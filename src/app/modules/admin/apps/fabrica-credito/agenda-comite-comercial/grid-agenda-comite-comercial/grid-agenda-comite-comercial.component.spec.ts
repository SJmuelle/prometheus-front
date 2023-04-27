import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridAgendaComiteComercialComponent } from './grid-agenda-comite-comercial.component';

describe('GridAgendaComiteComercialComponent', () => {
  let component: GridAgendaComiteComercialComponent;
  let fixture: ComponentFixture<GridAgendaComiteComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridAgendaComiteComercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridAgendaComiteComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
