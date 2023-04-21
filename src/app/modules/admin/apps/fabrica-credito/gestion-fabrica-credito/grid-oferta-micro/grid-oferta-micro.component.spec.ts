import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOfertaMicroComponent } from './grid-oferta-micro.component';

describe('GridOfertaMicroComponent', () => {
  let component: GridOfertaMicroComponent;
  let fixture: ComponentFixture<GridOfertaMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridOfertaMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOfertaMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
