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



const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'registro', component: UserRegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'confirmacion/:token', component: PasswordRegistrationComponent },
    {path: 'admin-mode' , component: AdminComponent},
    
    {
        path: 'dashboard', component: DashboardComponent,
        children: [
            {path: 'registerProveedor',component: ProveedorRegistrationComponent},
            { path: 'updateProveedor', component: ModificarDatosComponent },
            {path:'uploadFiles',component:FileUploadComponent },

        ]
    },
    //{ path:  'registerProveedor', component:ProveedorRegistrationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
