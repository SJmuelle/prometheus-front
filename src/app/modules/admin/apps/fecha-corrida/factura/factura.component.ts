import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CuentasxcobrarService } from 'app/core/services/cuentasxcobrar.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {

  listadoFacturas: any=[];
  banco: any = [];
  listproveedor: any=[];
  total:number;
  bancoForm: FormGroup;
  proveedorForm: FormGroup;
  allComplete: boolean = false;
  filterproveedor: String = '';
  public detailsFacture:any=[];
  public valores:number=0;
  transferencia={
    proveedor:"",
    banco:"",
    details:[]
  }
  mostrar:boolean;
  formatofecha:any;
  public fechaActual = new Date();
  minFecha: Date;
  maxFecha: Date;

  get frm() {
    return this.bancoForm.controls;
  }

  get frmprov() {
    return this.proveedorForm.controls;
  }

  constructor(private cuentaService: CuentasxcobrarService, private fb: FormBuilder) {
    this.bancoForm = this.fb.group({
      nombreBanco: ['', [Validators.required]],
      totaltransferencia:['']
    });

    this.proveedorForm = this.fb.group({
      nit: ['', [Validators.required]],
      vencimiento: [this.fechaActual, [Validators.required]]
    });
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minFecha = new Date(currentYear - 20, 0, 1);
    this.maxFecha = new Date(this.fechaActual);
    this.consultaBanco();
    this.consultaProveedor();
  }

  filtrarDatos(){
    const {nit, vencimiento} = this.proveedorForm.getRawValue();
    const {nombreBanco, totaltransferencia} = this.bancoForm.getRawValue();
    this.formatofecha = moment(vencimiento).format("YYYY-MM-DD");
    Swal.fire({ title: 'Cargando', html: 'Buscando facturas por pagar', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { })
    this.cuentaService.getFacturesFilter(nit, this.formatofecha).subscribe((response: any)=>{
      Swal.close();
      if (response) {
        this.listadoFacturas = response.data;
      } else {
        this.listadoFacturas = [];
      }
      this.total = response.data.reduce((acc, obj) => acc + (1 * obj.valorFactura), 0);
      this.mostrar=true
    })

    if (totaltransferencia!=0 || nombreBanco!='') {
      this.bancoForm.reset();
      this.detailsFacture=[];
      this.valores=0;
    }
   
  }

  pagarFacturas(){
    const {nit} = this.proveedorForm.getRawValue();
    const { nombreBanco } = this.bancoForm.getRawValue();
    this.transferencia={
      proveedor:nit,
      banco:nombreBanco,
      details:this.detailsFacture
    }
    if (this.transferencia.details.length <= 0) {
      Swal.fire(
        '¡Información!',
        `Debe seleccionar al menos una factura.`,
        'error'
      ).then();
    }else{
      this.cuentaService.postTransferencia(this.transferencia).subscribe((response: any)=>{
        console.log( this.transferencia)
        console.log("Aqui tus datos: ", response)
        if (response.msg != "OK") {
          Swal.fire(
            '¡Información!',
            `Debe seleccionar al menos una factura.`,
            'error'
          ).then();
          return;
        }
        Swal.fire(
          '¡Transferencia!',
          `La transferencia ha sido exitosa.`,
          'success'
        ).then();
        this.mostrar=false
        this.bancoForm.reset();
        this.proveedorForm.reset();
        this.detailsFacture=[];
        this.valores=0;
      })

    }
    
  }

  acumular(item){
    if(item.completed){
      this.detailsFacture.push({documentoCxp:item.documentoCxp})   
      this.valores=this.valores+item.valorFactura;
    }else{
      let idx =  this.detailsFacture.indexOf({
        documentoCxp:item.documentoCxp
      });
      this.detailsFacture.splice(idx, 1)
      this.valores=this.valores-item.valorFactura;
    }
  }

  updateAllComplete() {
    this.allComplete = this.listadoFacturas != null && this.listadoFacturas.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.listadoFacturas== null) {
      return false;
    }
    return this.listadoFacturas.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.listadoFacturas == null) {
      return;
    }
    if(completed){
      this.detailsFacture=[];
      for (const item of this.listadoFacturas) {
        this.detailsFacture.push({
          documentoCxp:item.documentoCxp
        })
        this.valores=this.total;
      }
    }else{
      this.detailsFacture=[];
      this.valores=0;
    }
    this.listadoFacturas.forEach(t => (t.completed = completed));
  }

  consultaBanco(){
    this.cuentaService.getBanco().subscribe((response: any) => {
      if (response) {
        this.banco = response.data;
      }
    });
  }

  consultaProveedor(){
    this.cuentaService.getProveedor().subscribe((response: any) => {
      if (response) {
        this.listproveedor = response.data;  
      }
    });
  }

}
