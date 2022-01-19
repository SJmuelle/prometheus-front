import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import { HttpClient } from '@angular/common/http'; 
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { Moment } from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class FacturaComponent implements OnInit {

  listado: any=[];

  public page:number=1;

  public tamanoTabl = new FormControl("5");

  filtrarTabla:string='';

  mostrar_form:boolean = true;

  banco: any = [];

  proveedor: any = [];

  total:number;

  bancoForm: FormGroup;

  proveedorForm: FormGroup;

  allComplete: boolean = false;

  filterfactura = '';

  filterfactdate = '';

  filterproveedor: String = '';

  ArrayGuardado:any=[]

  myArr = sessionStorage.getItem('usuario');

  myArrStr = JSON.parse(this.myArr);

  public ver:boolean = true;

  datosTransferencia:any;

  trans={
    proveedor:"",
    banco:"",
    usuario: this.myArrStr.user,
    details:[]
  }

  arrayFiltro:any=[]

  date = new FormControl(new Date());

  mystartDate:Date;

  showModal = false;

  get frm() {
    return this.bancoForm.controls;
  }

  get frmprov() {
    return this.proveedorForm.controls;
  }

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService, private fb: FormBuilder, private auth: AuthService, private http:HttpClient) {
    this.bancoForm = this.fb.group({
      nombreBanco: ['', [Validators.required]]
    });

    this.proveedorForm = this.fb.group({
      nit: ['', [Validators.required]],
      vencimiento: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // this.mystartDate = new Date('12/2/2020');
    // this.consulta();
    this.filtrarDatos();
    // this.suma();
    this.consultaBnco();
    this.consultaProveedor();
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  filtrarDatos(){
    const {nit, vencimiento} = this.proveedorForm.getRawValue();
    console.log(nit, vencimiento);
    this.cuentaService.getFacturesFilter(nit, vencimiento).subscribe((response: any)=>{
      this.arrayFiltro = response.data

      if (response) {
        this.listado = this.arrayFiltro;
      } else {
        this.listado = [];
      }

      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
      console.log(this.total)
      // console.log("Aqui tu dato", response.data)
      this.ver=true
    })
  }

  acumular(item){
    let data={
      documentoCxp:item.documentoCxp
    }
    if(item.completed){

      this.trans.details.push(data)

    }else{
      let idx =  this.trans.details.indexOf(data);
      this.trans.details.splice(idx, 1)
    }
    console.log( this.trans.details)
  }

  pagarFacturas(){
    this.cuentaService.postTransferencia(this.trans).subscribe((response: any)=>{
      console.log("Aqui tus datos: ", response)
      // console.log("Aqui tu proveedor: ", this.trans.proveedor)
      // console.log("Aqui tu banco: ", this.trans.banco)
      // console.log("Aqui tu usuario: ", this.trans.usuario)
      // console.log("Aqui tus facturas: ", this.trans.details)
    })
    
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
