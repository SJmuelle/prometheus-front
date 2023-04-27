import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCarteraMicroComponent } from './grid-cartera-micro.component';

describe('GridCarteraMicroComponent', () => {
  let component: GridCarteraMicroComponent;
  let fixture: ComponentFixture<GridCarteraMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridCarteraMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridCarteraMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
