import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { CatService } from '../../_services/Catalogos.service';



@Component({
  selector: 'app-proveedor-registration',
  templateUrl: './proveedor-registration.component.html',
  styleUrls: ['./proveedor-registration.component.css'],

})
export class ProveedorRegistrationComponent implements OnInit {
  proveedorForm: any;
  registroExitoso = false;
  mensajeExito = '';
  esExtranjero: boolean = false;
  formSubmitted = false;
  isUserRegistered = false;
  usuarioRegistrado: boolean = false;
  usuarioAutenticado:any;
  authUser:any;
  idUser:any;
  proveedorId:any;

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
    private router: Router,  
    private location: Location, 
    private cdr: ChangeDetectorRef,
    private catService: CatService
    
    ) {}
  

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

    this.usuarioAutenticado = window.sessionStorage.getItem('auth-user');
    this.authUser = JSON.parse(this.usuarioAutenticado);
    this.idUser = this.authUser.data.id;

    const proveedorId = localStorage.getItem('proveedorId');
    if (proveedorId) {
      this.usuarioRegistrado = true;
    }
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      razonSocial: ['', Validators.required],
      estratificacion: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(13)]],
      actividadEconomica: ['', Validators.required],
      domicilioNombre: ['', Validators.required],
      domicilioNumeroExterior: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      domicilioNumeroInterior: [''],
      domicilioNombreAsentamiento: ['', Validators.required],
      domicilioClaveLocalidad: ['', Validators.required],
      domicilioNombreLocalidad: ['', Validators.required],
      domicilioClaveMunicipio: ['', Validators.required],
      domicilioNombreMunicipio: ['', Validators.required],
      domicilioClaveEntidad: ['', Validators.required],
      domicilioCP: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      esExtranjero: ['1'],
      extranjeroPais: [''],
      extranjeroCiudad: [''],
      extranjeroCalle: [''],
      extranjeroNumero: [''],
      representanteLegalNombre: ['', Validators.required],
      representanteLegalPrimerApellido: ['', Validators.required],
      representanteLegalSegundoApellido: ['', Validators.required],
      representanteLegalTelefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      representanteLegalMail: ['', Validators.required],
      website: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      catSexoId: ['', Validators.required],
      catOrigenId: ['', Validators.required],
      catEntidadFederativaId: ['', Validators.required],
      catRealizaSubcontratacionesId: ['', Validators.required],
      catDomicilioVialidadId: ['', Validators.required],
      catDomicilioTipoAsentamientoId: ['', Validators.required],
      catDomicilioEntidadFederativaId: ['', Validators.required],
      catRepresentanteLegalTipoAcreditacionId: ['', Validators.required],
      catGiroId:['', Validators.required],
      user_id:this.idUser
      
    });
  }


  toggleExtranjero() {
    this.esExtranjero = this.proveedorForm.get('esExtranjero').value === '2';
  }

  
  submitForm() {
      if (!this.formSubmitted && this.proveedorForm.valid) {
        const formData = this.proveedorForm.value;
        this.proveedorService.registrarProveedor(formData).subscribe(
          (response) => {
            alert('Proveedor registrado con éxito');
            this.registroExitoso = true;
            this.mostrarMensajeExito();
            this.proveedorForm.reset();
            this.formSubmitted = true;
            this.usuarioRegistrado = true;
            localStorage.setItem('usuarioRegistrado', 'true');
            this.cdr.detectChanges();
            this.router.navigate(['/dashboard/uploadFiles']);
          },
          (error) => {
            alert('Error al registrar el proveedor,Verifica que los datos esten completos');
          }
        );
      }
    }

  mostrarMensajeExito() {
    const mensajeExito = document.getElementById('mensaje-exito');
    const cerrarMensaje = document.getElementById('cerrar-mensaje');

    if (mensajeExito && cerrarMensaje) {
      mensajeExito.style.display = 'block';

      cerrarMensaje.addEventListener('click', () => {
        mensajeExito.style.display = '/login';
      });
    }
  }
  cerrarMensaje() {
    this.registroExitoso = false;
    this.mensajeExito = '';

    window.history.pushState({}, '', '/login');
    this.router.navigateByUrl('/login');
  }
}
