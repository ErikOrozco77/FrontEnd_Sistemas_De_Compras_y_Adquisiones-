import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import { PasswordRegistrationComponent } from './components/password-registration/password-registration.component';
import { ProveedorRegistrationComponent } from './components/proveedor-registration/proveedor-registration.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatDividerModule} from '@angular/material/divider';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ModificarDatosComponent } from './components/modificar-datos/modificar-datos.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProveedorDetalleComponent } from './components/proveedor-detalle/proveedor-detalle.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProveedorModalService } from './_services/ProveedorModal.service';
import { FileReplaceDialogComponent } from './components/file-replace-dialog/file-replace-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ConcursoComponent } from './components/concurso/concurso.component';
import { ConcursoService } from './_services/concurso.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { ListaConcursosComponent } from './components/lista-concursos/lista-concursos.component';
import { UpdateConcursoComponentComponent } from './components/update-concurso-component/update-concurso-component.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { SeleccionGanadorComponent } from './components/seleccion-ganador/seleccion-ganador.component';
import { SeleccionProveedorDialogComponent } from './components/seleccion-proveedor-dialog/seleccion-proveedor-dialog.component';
import { SeleccionProveedorModificacionComponent } from './components/seleccion-proveedor-modificacion/seleccion-proveedor-modificacion.component';
import { MenuConcursosComponent } from './components/menu-concursos/menu-concursos.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MenuProveedoresConcursantesComponent } from './components/menu-proveedores-concursantes/menu-proveedores-concursantes.component';
import { ProveedoresConcursantesDialogComponentComponent } from './components/proveedores-concursantes-dialog-component/proveedores-concursantes-dialog-component.component';
import { VerificarInvitacionesComponent } from './components/verificar-invitaciones/verificar-invitaciones.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { MatSortModule } from '@angular/material/sort';




@NgModule({
        providers: [
            ProveedorModalService,{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
        ],
        declarations:[
        AppComponent,
        LoginComponent,
        PasswordRegistrationComponent,
        ProveedorRegistrationComponent,
        InicioComponent,
        UserRegistrationComponent,
        DashboardComponent,
        ModificarDatosComponent,
        FileUploadComponent,
        AdminComponent,
        ProveedorDetalleComponent,
        FileReplaceDialogComponent,
        ConcursoComponent,
        ListaProveedoresComponent,
        ListaConcursosComponent,
        UpdateConcursoComponentComponent,
        ConfirmDialogComponent,
        SeleccionGanadorComponent,
        SeleccionProveedorDialogComponent,
        SeleccionProveedorModificacionComponent,
        MenuConcursosComponent,
        MenuProveedoresConcursantesComponent,
        ProveedoresConcursantesDialogComponentComponent,
        VerificarInvitacionesComponent,
        PasswordResetComponent,
        NewPasswordComponent,



    
    ],
    imports: [
        MatSortModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,    
        MatDividerModule,
        NgxCaptchaModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        BrowserModule,
        AppRoutingModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatInputModule,
        NgxCaptchaModule
 
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
