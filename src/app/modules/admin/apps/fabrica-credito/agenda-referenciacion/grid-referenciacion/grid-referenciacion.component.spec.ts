import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridReferenciacionComponent } from './grid-referenciacion.component';

describe('GridReferenciacionComponent', () => {
  let component: GridReferenciacionComponent;
  let fixture: ComponentFixture<GridReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
