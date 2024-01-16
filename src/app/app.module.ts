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

@NgModule({
        providers: [ProveedorModalService],
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
        


    
    ],
    imports: [
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

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
