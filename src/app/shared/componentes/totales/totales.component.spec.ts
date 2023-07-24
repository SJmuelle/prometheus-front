import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalesComponent } from './totales.component';

describe('TotalesComponent', () => {
  let component: TotalesComponent;
  let fixture: ComponentFixture<TotalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
