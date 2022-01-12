import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],  
})
export class FacturaComponent implements OnInit {

  listado: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';
  mostrar_form:boolean=true;
  datos: any={};

  banco: any=[];

  total:number;

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService) { }

  ngOnInit(): void {
    // this.consulta();
    // this.total = this.cuentaService().reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
    // this.suma();
    
  }

  suma(){
    this.cuentaService.getAllFactures().subscribe((response: any) => {
      
      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
      console.log(this.total)
    });
  }

  consulta(){
    Swal.fire({ title: 'Cargando', html: 'Buscando facturas por pagar', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.cuentaService.getAllFactures().subscribe((response: any) => {
        Swal.close();
        // console.log(response)
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
    });
  }

  consultaBnco(){
    this.cuentaService.getAllFactures().subscribe((response: any) => {
      // console.log(response)
      if (response) {
        //this.banco = response.data;
      } else {
        this.banco = [];
      }
  });
  }

}
