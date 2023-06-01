import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoCreditoMicroComponent } from './calculo-credito-micro.component';

describe('CalculoCreditoMicroComponent', () => {
  let component: CalculoCreditoMicroComponent;
  let fixture: ComponentFixture<CalculoCreditoMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoCreditoMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculoCreditoMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
