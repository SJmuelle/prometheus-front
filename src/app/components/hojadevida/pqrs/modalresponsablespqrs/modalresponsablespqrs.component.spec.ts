import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalresponsablespqrsComponent } from './modalresponsablespqrs.component';

describe('ModalresponsablespqrsComponent', () => {
  let component: ModalresponsablespqrsComponent;
  let fixture: ComponentFixture<ModalresponsablespqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalresponsablespqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalresponsablespqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
