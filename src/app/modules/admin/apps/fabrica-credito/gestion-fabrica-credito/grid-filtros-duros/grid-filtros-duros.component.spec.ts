import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFiltrosDurosComponent } from './grid-filtros-duros.component';

describe('GridFiltrosDurosComponent', () => {
  let component: GridFiltrosDurosComponent;
  let fixture: ComponentFixture<GridFiltrosDurosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridFiltrosDurosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFiltrosDurosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
