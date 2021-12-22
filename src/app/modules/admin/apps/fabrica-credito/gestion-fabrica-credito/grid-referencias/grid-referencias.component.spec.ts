import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReferenciasComponent } from './grid-referencias.component';

describe('GridReferenciasComponent', () => {
  let component: GridReferenciasComponent;
  let fixture: ComponentFixture<GridReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridReferenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
