import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  listado: any=[];

  page:number=1;

  tamanoTabl:number=5;

  filtrarTabla:string='';

  mostrar_form:boolean = true;

  banco: any = [];

  proveedor: any = [];

  total:number;

  bancoForm: FormGroup;

  proveedorForm: FormGroup;

  allComplete: boolean = false;

  filterfactura: String = '';

  filterfactdate = '';

  filterproveedor: String = '';

  nit = false;
  docufactura: String = '';
  opcion = false;
  transferencia:string = '';

  ArrayGuardado:any=[]
  get frm() {
    return this.bancoForm.controls;
  }

  get frmprov() {
    return this.proveedorForm.controls;
  }

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService, private fb: FormBuilder) {
    this.bancoForm = this.fb.group({
      nombreBanco: ['', [Validators.required]]
    });

    this.proveedorForm = this.fb.group({
      nombreProveedor: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      filterprov: ['']
    });
  }

  ngOnInit(): void {
    this.consulta();
    this.suma();
    this.consultaBnco();
    this.consultaProveedor();
  }

  acumular(item){
    let data={
      nit:item.nit,
      factura:item.documentoCxp
    }
    if(item.completed){
      this.ArrayGuardado.push(data)
    }else{
      let idx =  this.ArrayGuardado.indexOf(data);
      this.ArrayGuardado.splice(idx, 1)
    }
    console.log( this.ArrayGuardado)
  }

  pagarFacturas(){
    
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
        console.log(response)
        if (response) {
          this.listado = response.data;
        } else {
          this.listado = [];
        }
    });
  }

  updateAllComplete() {
    this.allComplete = this.listado != null && this.listado.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.listado== null) {
      return false;
    }
    return this.listado.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listado == null) {
      return;
    }
    if(completed){
      this.ArrayGuardado=[];
      for (const item of this.listado) {
        this.ArrayGuardado.push({
          nit:item.nit,
          factura:item.documentoCxp
        })
      }
    }else{
      this.ArrayGuardado=[];
    }
    console.log( this.ArrayGuardado)
    this.listado.forEach(t => (t.completed = completed));
  }

  consultaBnco(){
    this.cuentaService.getBnco().subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.banco = response.data;
      }
    });
  }

  consultaProveedor(){
    this.cuentaService.getProveedor().subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.proveedor = response.data;
      }
    });
  }

}
