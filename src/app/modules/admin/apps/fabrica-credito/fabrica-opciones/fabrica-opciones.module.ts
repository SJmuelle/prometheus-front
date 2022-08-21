import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabricaOpcionesComponent } from './fabrica-opciones.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { GestionFabricaCreditoModule } from '../gestion-fabrica-credito/gestion-fabrica-credito.module';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    CdkScrollableModule,
    MatIconModule,
    MatDatepickerModule,
    MatTabsModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxExtendedPdfViewerModule,
    Ng2SearchPipeModule,
    PdfViewerModule,
    NgxPaginationModule,
    MatListModule,
    FuseDrawerModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    GestionFabricaCreditoModule
  ],
  exports:[FabricaOpcionesComponent],
  declarations: [FabricaOpcionesComponent]
})
export class FabricaOpcionesModule { }
