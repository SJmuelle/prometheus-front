import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CausalespqrsComponent } from './causalespqrs.component';

describe('CausalespqrsComponent', () => {
  let component: CausalespqrsComponent;
  let fixture: ComponentFixture<CausalespqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CausalespqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CausalespqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
