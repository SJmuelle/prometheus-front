import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { ActivitiesService } from 'app/modules/admin/pages/activities/activities.service';
import { Item } from './file-manager.types'; 
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PreviewComponent } from './preview/preview.component';
import { InfofileComponent } from './infofile/infofile.component';

@Component({
    selector       : 'activity',
    templateUrl    : './activities.component.html',
    encapsulation  : ViewEncapsulation.None
})
export class ActivitiesComponent implements OnInit
{
    value = '';

    listFile: any = [];

    screenWidth: any;

    fileForm: FormGroup;

    datosDescarga={
        idArchivo:""
    }

    get frm() {
        return this.fileForm.controls;
    }

    constructor(public activityService: ActivitiesService, 
        private dialog: MatDialog, 
        private fb: FormBuilder){

            this.fileForm = this.fb.group({
                idArchivo: ['']
            });
    }

    
    ngOnInit(): void {

        this.consultarArchivos();

    }


    consultarArchivos(){
        this.activityService.getFiles().subscribe((response: any) => {
            console.log(response.data)
            if (response.data) {

                this.listFile = response.data;
                
            }
            
        });
    }

    openDialog(id:any, type:any, name:any){

        this.screenWidth = window.innerWidth;

        const datosMostrar = {
            idArchivo: id
        };

        this.activityService.downFiles(datosMostrar).subscribe((response)=>{

            if (this.screenWidth <= 768) {

                const dialogRef = this.dialog.open(InfofileComponent, {
                    data: {
                        id: id,
                        extension: type,
                        nombre: name,
                        base64: response.data.base64
                    }
                })
                dialogRef.afterClosed().toPromise();

            } else {

                const dialogRef = this.dialog.open(PreviewComponent, {
                    width: '90vw',
                    data: {
                        id: id,
                        extension: type,
                        nombre: name,
                        base64: response.data.base64
                    }
                })
                dialogRef.afterClosed().toPromise();

            }

        })
        
    }

    downloadFile(id: any, type:any){

        console.log(id)
        console.log(type)

        this.datosDescarga={
            idArchivo: id
        }

        console.log(this.datosDescarga)

        this.activityService.downFiles(this.datosDescarga).subscribe((response:any)=>{

            if(response) {
                // console.log("Aqui estoy... Si estoy entrando")
                // console.log(response.data)
                const archivo = response.data.base64.split(',')[1];
                // console.log(archivo)
                const extension = type
                // console.log(response)
                const link = document.createElement('a');
                document.body.appendChild(link);
                link.href = `data:application/${extension};base64,${archivo}`;
                link.target = '_self';
                link.download = response.data.filename
                link.click();
                Swal.close();
            }

        }) 

    }

    prevista(i:number){
        if (this.listFile[i].docupreview == false) {

            this.listFile[i].docupreview = true;

        }else{
            
            this.listFile[i].docupreview = false
        
        }
        // console.log("Archivo numero: ", i," ", this.listFile[i].docupreview)
    }
    /**
     * Returns whether the given dates are different days
     *
     * @param current
     * @param compare
     */
    isSameDay(current: string, compare: string): boolean {
        return moment(current, moment.ISO_8601).isSame(moment(compare, moment.ISO_8601), 'day');
    }

    /**
     * Get the relative format of the given date
     *
     * @param date
     */
    getRelativeFormat(date: string): string {

        const today = moment().startOf('day');
        const yesterday = moment().subtract(1, 'day').startOf('day');

        // Is today?
        if ( moment(date, moment.ISO_8601).isSame(today, 'day') )
        {
            return 'Hoy';
        }

        // Is yesterday?
        if ( moment(date, moment.ISO_8601).isSame(yesterday, 'day') )
        {
            return 'Ayer';
        }

        return moment(date, moment.ISO_8601).fromNow();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
