import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPoliticasComponent } from './grid-politicas.component';

describe('GridPoliticasComponent', () => {
  let component: GridPoliticasComponent;
  let fixture: ComponentFixture<GridPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridPoliticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
