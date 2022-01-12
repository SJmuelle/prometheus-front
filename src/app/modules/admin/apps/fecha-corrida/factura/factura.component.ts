import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';


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
  mostrar_form:boolean = true;
  datos: any={};

  banco: any = [];

  total:number;

  bncoForm: FormGroup;

  get frm() {
    return this.bncoForm.controls;
  }

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService, private fb: FormBuilder) {
    this.bncoForm = this.fb.group({
      nombreBanco: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.consulta();
    this.suma();
    this.consultaBnco();
  }

  seleccionarTodo(e:any){
    this.listado.array.forEach(x => {
      
    });
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
    this.cuentaService.getBnco().subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.banco = response.data;
      }
  });
  }

}
