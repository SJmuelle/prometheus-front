import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDocumentacionComponent } from './grid-documentacion.component';

describe('GridDocumentacionComponent', () => {
  let component: GridDocumentacionComponent;
  let fixture: ComponentFixture<GridDocumentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridDocumentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
