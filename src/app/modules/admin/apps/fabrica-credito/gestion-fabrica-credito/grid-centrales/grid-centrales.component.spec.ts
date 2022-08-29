import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCentralesComponent } from './grid-centrales.component';

describe('GridCentralesComponent', () => {
  let component: GridCentralesComponent;
  let fixture: ComponentFixture<GridCentralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCentralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCentralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
