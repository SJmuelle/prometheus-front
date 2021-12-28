import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalescausalespqrsComponent } from './modalescausalespqrs.component';

describe('ModalescausalespqrsComponent', () => {
  let component: ModalescausalespqrsComponent;
  let fixture: ComponentFixture<ModalescausalespqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalescausalespqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalescausalespqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
