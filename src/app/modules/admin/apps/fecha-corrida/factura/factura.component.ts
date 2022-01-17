import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'app/core/auth/auth.service';

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

  ArrayBanco:any=[]

  tempArray:any=[]

  myArr = sessionStorage.getItem('usuario');

  myArrStr = JSON.parse(this.myArr);

  datosTransferencia:any;

  trans={
    proveedor:"",
    banco:"",
    usuario: this.myArrStr.user,
    details:[]
  }

  get frm() {
    return this.bancoForm.controls;
  }

  get frmprov() {
    return this.proveedorForm.controls;
  }

  constructor(public dialog: MatDialog, private cuentaService: CuentasxcobrarService, private fb: FormBuilder, private auth: AuthService) {
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
    
    // console.log(this.myArrStr.user);
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

  acumularBanco(item){
    let data={
      descripcion:item.descripcion
    }

    this.ArrayBanco.push(data)
    let idx =  this.ArrayBanco.indexOf(data);
    this.ArrayGuardado.splice(idx, 1)
    
    console.log( this.ArrayBanco)
  }

  pagarFacturas(){
    this.cuentaService.postTransferencia(this.trans).subscribe((response: any)=>{
      console.log("Aqui tus datos: ", response)
      // console.log("Aqui tu proveedor: ", this.trans.proveedor)
      // console.log("Aqui tu banco: ", this.trans.banco)
      // console.log("Aqui tu usuario: ", this.trans.usuario)
      // console.log("Aqui tus facturas: ", this.trans.details)
    })
    
    // console.log("Aqui tu usuario: ", sessionStorage.getItem('user'))

    // console.log("Usuario: ", localStorage.getItem('usuario'))
    
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
