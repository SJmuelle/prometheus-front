import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEvidenteComponent } from './tabla-evidente.component';

describe('TablaEvidenteComponent', () => {
  let component: TablaEvidenteComponent;
  let fixture: ComponentFixture<TablaEvidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaEvidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEvidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
