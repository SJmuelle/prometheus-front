import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FilterPipe } from './filterfactura.pipe';
@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacturaComponent implements OnInit {

  listado: any=[];
  page:number=1;
  tamanoTabl:number=5;
  filtrarTabla:string='';
  mostrar_form:boolean = true;
  datos: any={};

  banco: any = [];

  prov: any = [];

  total:number;

  bancoForm: FormGroup;

  proveedorForm: FormGroup;

  allComplete: boolean = false;

  filterfactura = '';

  filterfactdate = '';

  filterproveedor= '';

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
    this.listado.forEach(t => (t.completed = completed));
  }

  suma(){
    this.cuentaService.getAllFactures().subscribe((response: any) => {

      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
      console.log(this.total)
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

  consultaProveedor(){
    this.cuentaService.getProveedor().subscribe((response: any) => {
      console.log(response)
      if (response) {
        this.prov = response.data;
      }
    });
  }

}
