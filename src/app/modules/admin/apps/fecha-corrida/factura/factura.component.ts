import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';
import moment from 'moment';

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

  facturaForm: FormGroup;

  allComplete: boolean = false;

  filterfactura: String = '';

  filterfactdate = '';

  filterproveedor: String = '';

  nit = false;
  docufactura: String = '';
  opcion = false;
  transferencia:string = '';

  ArrayGuardado:any=[]

  ArrayBanco:any=[]

  tempArray:any=[]

  myArr = sessionStorage.getItem('usuario');

  myArrStr = JSON.parse(this.myArr);

  usuario:any = this.myArrStr.user
  
  public details:any=[];

  public valores:number=0;

  totalpago:number;

  public facturaPagar:any=[];

  datosTransferencia:any;

  trans={
    proveedor:"",
    banco:"",
    usuario: this.myArrStr.user,
    details:[]
  }

  mostrar:boolean;

  formatofecha:any;

  public hoy = new Date();

  minFecha: Date;
  maxFecha: Date;

  filtradorProveedor:any = [];

  get frm() {
    return this.bancoForm.controls;
  }

  get frmprov() {
    return this.proveedorForm.controls;
  }

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService, private fb: FormBuilder, private auth: AuthService) {
    this.bancoForm = this.fb.group({
      nombreBanco: ['', [Validators.required]],
      totaltransferencia: ['']
    });

    this.proveedorForm = this.fb.group({
      nit: ['', [Validators.required]],
      vencimiento: [this.hoy, [Validators.required]],
      filtro: ['']
    });
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minFecha = new Date(currentYear - 20, 0, 1);
    this.maxFecha = new Date(this.hoy);
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

  filtrarDatos(){
    
    const {nit, vencimiento} = this.proveedorForm.getRawValue();

    this.formatofecha = moment(vencimiento).format("YYYY-MM-DD");

    console.log(nit, this.formatofecha);
    Swal.fire({ title: 'Cargando', html: 'Buscando facturas por pagar', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.cuentaService.getFacturesFilter(nit, this.formatofecha).subscribe((response: any)=>{
      Swal.close();
      
      console.log(response.data)

      if (response) {
        this.listado = response.data;
      } else {
        this.listado = [];
      }
      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
      // console.log(this.total)
      this.mostrar=true
    })
   
  }

  pagarFacturas(){

    const {nit} = this.proveedorForm.getRawValue();
    const { nombreBanco } = this.bancoForm.getRawValue();
    this.trans={
      proveedor:nit,
      banco:nombreBanco,
      usuario: this.myArrStr.user,
      details:this.details
    }

    if (this.trans.details.length <= 0) {
      alert("Debe seleccionarse al menos una factura.")
      // console.log("Debe seleccionarse al menos una factura.")
    }else{

      console.log( this.trans)
      this.cuentaService.postTransferencia(this.trans).subscribe((response: any)=>{
        console.log("Aqui tus datos: ", response)
        alert("Transferencia exitosa.")
      })

    }

    this.bancoForm.reset();
    this.proveedorForm.reset()

  }

  acumular(item){
    let data={
      documentoCxp:item.documentoCxp
    }

    if(item.completed){

      this.details.push(data.documentoCxp)   
      this.valores=this.valores+item.valorFactura;
    }else{

      let idx =  this.details.indexOf(data);
      this.details.splice(idx, 1)
      this.valores=this.valores-item.valorFactura;
    }
    console.log( this.details)
    console.log( this.valores)
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
      this.details=[];
      for (const item of this.listado) {
        this.details.push({
          documentoCxp:item.documentoCxp
        })
        this.valores=this.total;
      }
    }else{
      this.details=[];
      this.valores=0;
    }
    console.log("Detalle factura", this.details)
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
