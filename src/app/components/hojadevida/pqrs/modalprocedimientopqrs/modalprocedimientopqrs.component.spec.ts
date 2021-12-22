import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalprocedimientopqrsComponent } from './modalprocedimientopqrs.component';

describe('ModalprocedimientopqrsComponent', () => {
    let component: ModalprocedimientopqrsComponent;
    let fixture: ComponentFixture<ModalprocedimientopqrsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalprocedimientopqrsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalprocedimientopqrsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
