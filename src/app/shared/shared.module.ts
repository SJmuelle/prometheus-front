import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// MODULOS MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { DirectionsBasicComponent } from './modal/directions-basic/directions-basic.component';
import { MatSortModule } from '@angular/material/sort';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
// import { FabricaOpcionesComponent } from './opciones/button/fabrica-opciones/fabrica-opciones.component';
import { FuseCardModule } from '@fuse/components/card';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableComponent } from './componentes/table/table.component';
import { SmPaginatorPipe } from './pipes/sm-paginator.pipe'
import { DataTablePipe } from './pipes/data-table.pipe';
import { HeaderComponent } from './componentes/header/header.component'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoDataComponent } from './componentes/no-data/no-data.component'


// import { FabricaCreditoModule } from 'app/modules/admin/apps/fabrica-credito/fabrica-credito.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDividerModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatRadioModule,
        MatFormFieldModule,
        MatCardModule,
        FuseDrawerModule,
        FuseCardModule,
        MatTooltipModule,
        MatSortModule,
        MatSliderModule,
        MatSidenavModule,
        MatExpansionModule,
        MatMenuModule,
        MatProgressBarModule,
        // FabricaCreditoModule,
        MatCheckboxModule

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDividerModule,
        MatInputModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatRadioModule,
        MatFormFieldModule,
        MatCardModule,
        MatSortModule,
        MatSliderModule,
        MatSidenavModule,
        MatExpansionModule,
        MatMenuModule,
        SmPaginatorPipe,
        DataTablePipe,
        TableComponent,
        HeaderComponent,
        MatProgressBarModule,
        MatCheckboxModule
    ],
    declarations: [
        DirectionsBasicComponent,
        SmPaginatorPipe,
        DataTablePipe,
        TableComponent,
        HeaderComponent,
        NoDataComponent



    ],
})
export class SharedModule { }
