import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordRegistrationComponent } from './components/password-registration/password-registration.component';
import { ProveedorRegistrationComponent } from './components/proveedor-registration/proveedor-registration.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModificarDatosComponent } from './components/modificar-datos/modificar-datos.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConcursoComponent } from './components/concurso/concurso.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { ListaConcursosComponent } from './components/lista-concursos/lista-concursos.component';
import { SeleccionGanadorComponent } from './components/seleccion-ganador/seleccion-ganador.component';
import { MenuConcursosComponent } from './components/menu-concursos/menu-concursos.component';
import { MenuProveedoresConcursantesComponent } from './components/menu-proveedores-concursantes/menu-proveedores-concursantes.component';
import { VerificarInvitacionesComponent } from './components/verificar-invitaciones/verificar-invitaciones.component';
import { AdminGuard } from './_guards/admin.guard';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'registro', component: UserRegistrationComponent },
    { path: 'login', component: LoginComponent},
    { path: 'confirmacion/:token', component: PasswordRegistrationComponent },
    { path: 'password/reset/request', component: PasswordResetComponent }, 
    { path: 'new-password/:token', component: NewPasswordComponent  }, 
    { path: 'admin-mode', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'register-concurso', component: ConcursoComponent, canActivate: [AdminGuard] },
    { path: 'seleccionDeProveedores/:id_concurso', component: ListaProveedoresComponent, canActivate: [AdminGuard] },
    { path: 'ListarConcursos', component: ListaConcursosComponent, canActivate: [AdminGuard] },
    { path: 'SeleccionGanador', component: SeleccionGanadorComponent, canActivate: [AdminGuard] },
    { path: 'menu-concurso', component: MenuConcursosComponent, canActivate: [AdminGuard] },
    { path: 'menu-proveedoresConcursantes', component: MenuProveedoresConcursantesComponent, canActivate: [AdminGuard] },

    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: 'registerProveedor', component: ProveedorRegistrationComponent, canActivate: [AuthGuard] },
            { path: 'updateProveedor', component: ModificarDatosComponent , canActivate: [AuthGuard]},
            { path: 'uploadFiles', component: FileUploadComponent , canActivate: [AuthGuard]},
            { path: 'buzon', component: VerificarInvitacionesComponent, canActivate: [AuthGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
