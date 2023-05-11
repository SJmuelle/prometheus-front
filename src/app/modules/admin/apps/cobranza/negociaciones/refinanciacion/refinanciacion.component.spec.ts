import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinanciacionComponent } from './refinanciacion.component';

describe('RefinanciacionComponent', () => {
  let component: RefinanciacionComponent;
  let fixture: ComponentFixture<RefinanciacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefinanciacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
