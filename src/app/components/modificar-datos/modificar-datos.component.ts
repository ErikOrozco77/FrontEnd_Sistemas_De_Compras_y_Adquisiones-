import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from 'src/app/_services/Catalogos.service';

@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.component.html',
  styleUrls: ['./modificar-datos.component.css']
})
export class ModificarDatosComponent implements OnInit {

  proveedorForm!: FormGroup;
  proveedorId: number = 0;
  mostrarCampoExtranjero: boolean = false;
  esExtranjero: boolean = false;
  formSubmitted: boolean = false;
  registroExitoso: boolean = false;
  mensajeExito = '';
  idUser!: number;
  usuarioAutenticado: any;
  authUser: any;


  catRepresentanteLegalTipoAcreditacionList: any[] = [];
  catSexoList: any[] = [];
  catRolesList: any[] = [];
  catRealizaSubcontratacionesList: any[] = [];
  catOrigenList: any[] = [];
  catEntidadFederativaList: any[] = [];
  catDomicilioVialidadList: any[] = [];
  catDomicilioTipoAsentamientoList: any[] = [];
  catDomicilioEntidadFederativaList: any[] = [];
  catGiroList: any[] = [];


  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router,
    private catService: CatService

  ) {
    this.usuarioAutenticado = window.sessionStorage.getItem('auth-user');
    this.authUser = JSON.parse(this.usuarioAutenticado);
    this.idUser = this.authUser.data.id;
  }

  ngOnInit() {

    this.catService.getCatSexoList().subscribe((data: any) => {
      this.catSexoList = data;

    });

    this.catService.getCatRepresentanteLegalTipoAcreditacion().subscribe((data: any) => {
      this.catRepresentanteLegalTipoAcreditacionList = data;
    });

    this.catService.getCatRealizaSubcontrataciones().subscribe((data: any) => {
      this.catRealizaSubcontratacionesList = data;
    });

    this.catService.getCatOrigen().subscribe((data: any) => {
      this.catOrigenList = data;
    });


    this.catService.getCatEntidadFederativa().subscribe((data: any) => {
      this.catEntidadFederativaList = data;
    });

    this.catService.getCatDomicilioVialidad().subscribe((data: any) => {
      this.catDomicilioVialidadList = data;
    });

    this.catService.getCatDomicilioTipoAsentamiento().subscribe((data: any) => {
      this.catDomicilioTipoAsentamientoList = data;
    });

    this.catService.getCatDomicilioEntidadFederativa().subscribe((data: any) => {
      this.catDomicilioEntidadFederativaList = data;
    });

    this.catService.getCatGiro().subscribe((data: any) => {
      this.catGiroList = data;
    });


    this.proveedorForm = this.fb.group({
      id: [''],
      nombre: [''],
      primerApellido: [''],
      segundoApellido: [''],
      razonSocial: [''],
      estratificacion: [''],
      paisOrigen: [''],
      rfc: [''],
      actividadEconomica: [''],
      domicilioNombre: [''],
      domicilioNumeroExterior: [''],
      domicilioNumeroInterior: [''],
      domicilioNombreAsentamiento: [''],
      domicilioClaveLocalidad: [''],
      domicilioNombreLocalidad: [''],
      domicilioClaveMunicipio: [''],
      domicilioNombreMunicipio: [''],
      domicilioClaveEntidad: [''],
      domicilioCP: [''],
      esExtranjero: ['1'],
      extranjeroPais: [''],
      extranjeroCiudad: [''],
      extranjeroCalle: [''],
      extranjeroNumero: [''],
      mostrarCampoExtranjero: [''],
      representanteLegalNombre: [''],
      representanteLegalPrimerApellido: [''],
      representanteLegalSegundoApellido: [''],
      representanteLegalTelefono: [''],
      representanteLegalMail: [''],
      website: [''],
      telefono: [''],
      catSexoId: [''],
      catOrigenId: [''],
      catEntidadFederativaId: [''],
      catRealizaSubcontratacionesId: [''],
      catDomicilioVialidadId: [''],
      catDomicilioTipoAsentamientoId: [''],
      catDomicilioEntidadFederativaId: [''],
      catRepresentanteLegalTipoAcreditacionId: [''],
      catGiroId: [''],
      user_id: this.idUser
    });

    this.route.paramMap.subscribe((params) => {
      this.idUser = this.authUser.data.id;

      this.proveedorService.getProveedorByUserId(this.idUser).subscribe(
        (proveedor) => {
          if (proveedor) {
            this.proveedorForm.patchValue(proveedor);
            const tieneDireccionExtranjera = this.tieneDireccionExtranjera(proveedor);

            if (tieneDireccionExtranjera) {
              this.proveedorForm.get('esExtranjero')?.setValue('2');
            }
            const catSexoIdControl = this.proveedorForm.get('catSexoId');
            if (catSexoIdControl) {
              catSexoIdControl.setValue((proveedor as any)?.CatSexo?.id || null);
            } else {
              console.error('Control catSexoId no encontrado en el formulario');
            }

            const catRepresentanteLegalTipoAcreditacionIdControl = this.proveedorForm.get('catRepresentanteLegalTipoAcreditacionId');
            if (catRepresentanteLegalTipoAcreditacionIdControl) {
              catRepresentanteLegalTipoAcreditacionIdControl.setValue((proveedor as any)?.CatRepresentanteLegalTipoAcreditacion?.id || null);
            } else {
              console.error('Control CatRepresentanteLegalTipoAcreditacion no encontrado en el formulario');
            }

            const catRealizaSubcontratacionesIdControl = this.proveedorForm.get('catRealizaSubcontratacionesId');
            if (catRealizaSubcontratacionesIdControl) {
              catRealizaSubcontratacionesIdControl.setValue((proveedor as any)?.CatRealizaSubcontrataciones?.id || null);
            } else {
              console.error('Control CatRealizaSubcontrataciones no encontrado en el formulario');
            }

            const catOrigenIdControl = this.proveedorForm.get('catOrigenId');
            if (catOrigenIdControl) {
              catOrigenIdControl.setValue((proveedor as any)?.CatOrigen?.id || null);
            } else {
              console.error('Control CatOrigen no encontrado en el formulario');
            }

            const catEntidadFederativaIdControl = this.proveedorForm.get('catEntidadFederativaId');
            if (catEntidadFederativaIdControl) {
              catEntidadFederativaIdControl.setValue((proveedor as any)?.CatEntidadFederativa?.id || null);
            } else {
              console.error('Control CatEntidadFederativa no encontrado en el formulario');
            }

            const catDomicilioVialidadIdControl = this.proveedorForm.get('catDomicilioVialidadId');
            if (catDomicilioVialidadIdControl) {
              catDomicilioVialidadIdControl.setValue((proveedor as any)?.CatDomicilioVialidad?.id || null);
            } else {
              console.error('Control CatDomicilioVialidad no encontrado en el formulario');
            }

            const catDomicilioTipoAsentamientoIdControl = this.proveedorForm.get('catDomicilioTipoAsentamientoId');
            if (catDomicilioTipoAsentamientoIdControl) {
              catDomicilioTipoAsentamientoIdControl.setValue((proveedor as any)?.CatDomicilioTipoAsentamiento?.id || null);
            } else {
              console.error('Control CatDomicilioTipoAsentamiento no encontrado en el formulario');
            }


            /* Domicilio Entidad Federativa*/
            const catDomicilioEntidadFederativaIdControl = this.proveedorForm.get('catDomicilioEntidadFederativaId');
            if (catDomicilioEntidadFederativaIdControl) {
              catDomicilioEntidadFederativaIdControl.setValue((proveedor as any)?.CatDomicilioEntidadFederativa?.id || null);
            } else {
              console.error('Control CatDomicilioEntidadFederativa no encontrado en el formulario');
            }

            /* Domicilio Entidad Federativa*/
            const catGiroIdControl = this.proveedorForm.get('catGiroId');
            if (catGiroIdControl) {
              catGiroIdControl.setValue((proveedor as any)?.CatGiro?.id || null);
            } else {
              console.error('Control CatGiro no encontrado en el formulario');
            }
          } else {
            console.error('Proveedor no encontrado');

          }

        },
        (error) => {
          console.error('Error al cargar el proveedor', error);
        }
      );

    });

  }

  tieneDireccionExtranjera(proveedor: any): boolean {
    return !!(proveedor && proveedor.extranjeroPais && proveedor.extranjeroCiudad && proveedor.extranjeroCalle && proveedor.extranjeroNumero);
  }

  toggleExtranjero() {
    this.esExtranjero = this.proveedorForm.get('esExtranjero')?.value === '2';
  }

  submitForm() {
    if (this.proveedorForm.valid) {
      const formData = this.proveedorForm.value;
      const userId = this.idUser;

      this.proveedorService.updateProveedor(userId, formData).subscribe(
        (response) => {
          alert('Proveedor actualizado con éxito');
          this.registroExitoso = true;
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {

          alert('Error al actualizar el proveedor');
        }
      );
    }
  }

  cerrarMensaje() {
    this.registroExitoso = false;
    window.history.pushState({}, '', '/dashboard');
    this.router.navigateByUrl('/dashboard');
  }
  setSelectedOptions() {
    const formControls = ['catSexoId', 'catRepresentanteLegalTipoAcreditacionId', 'catRealizaSubcontratacionesId', 'catOrigenId', 'catEntidadFederativaId', 'catDomicilioVialidadId', 'catDomicilioTipoAsentamientoId', 'catDomicilioEntidadFederativaId', 'catGiroId'];

    formControls.forEach(control => {
      const controlValue = this.proveedorForm.get(control)?.value;
      if (controlValue !== null) {
        this.proveedorForm.get(control)?.setValue(controlValue.toString());
      }
    });
  }

}


