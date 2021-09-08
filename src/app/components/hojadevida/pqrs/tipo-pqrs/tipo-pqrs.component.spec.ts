import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPqrsComponent } from './tipo-pqrs.component';

describe('TipoPqrsComponent', () => {
  let component: TipoPqrsComponent;
  let fixture: ComponentFixture<TipoPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPqrsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
