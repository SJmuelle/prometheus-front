import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongelaTuDeudaComponent } from './congela-tu-deuda.component';

describe('CongelaTuDeudaComponent', () => {
  let component: CongelaTuDeudaComponent;
  let fixture: ComponentFixture<CongelaTuDeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongelaTuDeudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongelaTuDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
