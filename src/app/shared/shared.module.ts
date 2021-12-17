import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


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
    ],
    declarations: [
  ],
    /*providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi   : true
        }
    ]*/
})
export class SharedModule {}
