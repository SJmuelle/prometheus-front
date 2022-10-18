import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVariosComponent } from './asignar-varios.component';

describe('AsignarVariosComponent', () => {
  let component: AsignarVariosComponent;
  let fixture: ComponentFixture<AsignarVariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarVariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarVariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
