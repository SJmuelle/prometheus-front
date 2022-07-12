import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.component.html',
  styleUrls: ['./modulo.component.scss']
})
export class ModuloComponent implements OnInit, OnDestroy {
  form: FormGroup;
  icons$: Observable<any>;
  empresa: any[]=[];
 seach = new FormControl('');
 filterproveedor:String;
  private _unsubscribeAll: Subject<any> = new Subject();
  listado: any;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _menuService: MenuService,
    public dialog: MatDialog
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.form = this._formBuilder.group({
      empresa: ['', Validators.required],
      estado: ['A'],
      nombreModulo: ['', Validators.required],
      icono: ['code', Validators.required],
      componente: ['', Validators.required],
    });

    // Get the icons
    this.icons$ = this._menuService.icons;
    // this.empresa$=this._menuService.empresas;
    // console.log('his.empresa$')

    // console.log(this.empresa$)
    // Subscribe to icons
    this._menuService.icons
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((icons) => {
        this.listado=icons.list
        console.log(this.listado)
      });
      this._menuService.empresas
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.empresa=data.data
        // empresa.log(this.listado)
      });

  }


  guardar() {
    if (this.form.valid) {
      Swal.fire({
        title: 'Cargando',
        html: 'Guardando información...',
        timer: 500000,
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => { });
      let url = "/agregar-modulo-sistema"
      this._menuService.posbasic(url, this.form.value).subscribe((response: any) => {
        console.log(response)
        setTimeout(() => {
          Swal.close();
        }, 500);
      })
    } else {
      Swal.fire(
        'Información',
        'Todos los campos son requeridos',
        'error'
      );
    }
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  /**
   * modal icono
   */


}
