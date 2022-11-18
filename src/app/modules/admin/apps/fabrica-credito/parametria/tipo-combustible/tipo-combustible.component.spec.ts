import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCombustibleComponent } from './tipo-combustible.component';

describe('TipoCombustibleComponent', () => {
  let component: TipoCombustibleComponent;
  let fixture: ComponentFixture<TipoCombustibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCombustibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
