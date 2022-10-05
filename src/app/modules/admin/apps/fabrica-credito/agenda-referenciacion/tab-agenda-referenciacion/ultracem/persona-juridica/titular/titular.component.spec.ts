import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitularComponent } from './titular.component';

describe('TitularComponent', () => {
  let component: TitularComponent;
  let fixture: ComponentFixture<TitularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
