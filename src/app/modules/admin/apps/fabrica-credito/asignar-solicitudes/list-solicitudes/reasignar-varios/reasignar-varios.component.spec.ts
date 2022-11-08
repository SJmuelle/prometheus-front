import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignarVariosComponent } from './reasignar-varios.component';

describe('ReasignarVariosComponent', () => {
  let component: ReasignarVariosComponent;
  let fixture: ComponentFixture<ReasignarVariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasignarVariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasignarVariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
