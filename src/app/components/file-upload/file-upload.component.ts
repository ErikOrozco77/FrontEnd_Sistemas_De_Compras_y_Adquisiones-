import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service';
import { AuthService } from '../../_services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  fileUploadForm: FormGroup;
  authUser:any;
  idUser:any;
  Nombre:any;
  usuarioAutenticado:any;


  constructor(private fb: FormBuilder, private proveedorService: ProveedorService,  private authService: AuthService, private router: Router) {
    this.fileUploadForm = this.fb.group({
      archivoINE: [null],
      archivoConstancia: [null]
    });
    this.usuarioAutenticado = window.sessionStorage.getItem('auth-user');
    this.authUser = JSON.parse(this.usuarioAutenticado);
    this.idUser = this.authUser.data.id;
    this.Nombre=this.authUser.data.name;
    console.log(this.authUser);
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileUploadForm.get(field)?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('ine', this.fileUploadForm.get('archivoINE')?.value);
    formData.append('constancia', this.fileUploadForm.get('archivoConstancia')?.value);
    formData.append('user_id',this.idUser.toString());
    formData.append('nombre', this.Nombre);

    this.proveedorService.uploadFiles(formData).subscribe(
      (response) => {
        alert('Archivos subidos con éxito');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Error al subir archivos,Selecciona un archivo PDF.');
      }
    );
  }
  downloadINE() {
    this.proveedorService.downloadINE(this.idUser).subscribe(
      (response) => {
        this.handleFileDownload(response, `INE_${this.idUser}.pdf`);
      },
      (error) => {
        console.error('Error al descargar archivo INE', error);
      }
    );
  }

  downloadConstancia() {
    this.proveedorService.downloadConstancia(this.idUser).subscribe(
      (response) => {
        this.handleFileDownload(response, `Constancia_${this.idUser}.pdf`);
      },
      (error) => {
        console.error('Error al descargar archivo Constancia', error);
      }
    );
  }

  private handleFileDownload(response: any, fileName: string) {
    const blob = new Blob([response.body], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  deleteFile(field: string) {
    this.fileUploadForm.get(field)?.setValue(null);
  }

}

  

