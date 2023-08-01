import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MicrocreditoComponent } from './microcredito.component';
import { UtilityService } from 'app/core/services/utility.service';
import { DecisionService } from 'app/core/services/decision.service';
import { PermisosService } from 'app/core/services/permisos.service';
import { FormularioCreditoService } from 'app/core/services/formulario-credito.service';
import { MockAppSettingsService } from './mockTest.service'; // Import the mock service
import { GenericasService } from 'app/core/services/genericas.service';
import { of } from 'rxjs';

// Create a mock class for FormularioCreditoService
class MockFormularioCreditoService {
    cargueInicial(data) {
      // Create a mocked response data for testing
      const mockedResponse = {
        data: {
          // Add your desired mocked data here
        }
      };

      // Return an observable that emits the mocked response
      return of(mockedResponse);
    }

    getSalarioBasico(data) {
        const mockedResponse = {
            data: {
              // Add your desired mocked data here
              salarioMinimo: 1100000
            }
          };

           // Return an observable that emits the mocked response
      return of(mockedResponse);
    }
  }

fdescribe('MicrocreditoComponent', () => {
    let component: MicrocreditoComponent;
    let fixture: ComponentFixture<MicrocreditoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MicrocreditoComponent],
            providers: [
                FormBuilder,
                UtilityService,
                DecisionService,
                PermisosService,
                {
                    provide: FormularioCreditoService,
                    useClass: MockFormularioCreditoService, // Use the mock service here
                },
                {
                    provide: GenericasService,
                    useClass: MockAppSettingsService, // Use the mock service here
                },
                {
                    provide: DecisionService,
                    useClass: MockAppSettingsService, // Use the mock service here
                },
            ],
            imports: [RouterTestingModule, HttpClientTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MicrocreditoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    fit('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // Add your other test cases here

});
