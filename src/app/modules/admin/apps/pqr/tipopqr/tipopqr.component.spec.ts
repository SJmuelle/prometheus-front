import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipopqrComponent } from './tipopqr.component';

describe('TipopqrComponent', () => {
  let component: TipopqrComponent;
  let fixture: ComponentFixture<TipopqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipopqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipopqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
