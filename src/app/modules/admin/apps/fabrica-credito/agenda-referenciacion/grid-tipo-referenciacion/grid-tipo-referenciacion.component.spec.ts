import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTipoReferenciacionComponent } from './grid-tipo-referenciacion.component';

describe('GridTipoReferenciacionComponent', () => {
  let component: GridTipoReferenciacionComponent;
  let fixture: ComponentFixture<GridTipoReferenciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTipoReferenciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTipoReferenciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
