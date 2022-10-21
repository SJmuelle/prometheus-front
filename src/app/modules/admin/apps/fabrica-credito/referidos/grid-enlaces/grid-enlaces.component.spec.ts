import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEnlacesComponent } from './grid-enlaces.component';

describe('GridEnlacesComponent', () => {
  let component: GridEnlacesComponent;
  let fixture: ComponentFixture<GridEnlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEnlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridEnlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
