import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefTitularPnComponent } from './ref-titular-pn.component';

describe('RefTitularPnComponent', () => {
  let component: RefTitularPnComponent;
  let fixture: ComponentFixture<RefTitularPnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefTitularPnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefTitularPnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
