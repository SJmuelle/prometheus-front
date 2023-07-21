import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalcularOfertaMicroComponent } from './recalcular-oferta-micro.component';

describe('RecalcularOfertaMicroComponent', () => {
  let component: RecalcularOfertaMicroComponent;
  let fixture: ComponentFixture<RecalcularOfertaMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecalcularOfertaMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalcularOfertaMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
