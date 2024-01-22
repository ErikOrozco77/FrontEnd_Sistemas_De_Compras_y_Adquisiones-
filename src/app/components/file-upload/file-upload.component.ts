import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedorService } from '../../_services/proveedor.service';
import { AuthService } from '../../_services/auth.service'; 
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FileReplaceDialogComponent } from '../file-replace-dialog/file-replace-dialog.component';
import { Observable } from 'rxjs';
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
  archivosCargados: any = {};
  selectedFiles: { ine: File | null, constancia: File | null } = { ine: null, constancia: null };
  public archivosSubidos: boolean = false;
  public archivosAlmacenados: { ine: boolean, constancia: boolean } = { ine: false, constancia: false };


  constructor(private fb: FormBuilder, private proveedorService: ProveedorService,  private authService: AuthService, private router: Router, private dialog: MatDialog) {
    
    this.fileUploadForm = this.fb.group({
      archivoINE: [null],
      archivoConstancia: [null]
    });
    this.usuarioAutenticado = window.sessionStorage.getItem('auth-user');
    this.authUser = JSON.parse(this.usuarioAutenticado);
    this.idUser = this.authUser.data.id;
    this.Nombre=this.authUser.data.name;
    const archivosSubidosStorage = window.sessionStorage.getItem('archivosSubidos');
    this.archivosSubidos = archivosSubidosStorage === 'true';
    this.detectarArchivosAlmacenados();
  }

  detectarArchivosAlmacenados() {
    this.proveedorService.detectarArchivosAlmacenados(this.idUser).subscribe(
      (response: { ine: boolean, constancia: boolean }) => {
        this.archivosAlmacenados = response; 
      },
      (error) => {
        console.error('Error al detectar archivos almacenados:', error);
      }
    );
  }
  
  onFileChange(event: any, field: 'ine' | 'constancia') {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.setFile(field, file);
    }
  }

  private setFile(field: 'ine' | 'constancia', file: File | null) {
    // Establecer el valor del campo dinámicamente
    this.selectedFiles[field] = file;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('ine', this.selectedFiles.ine || ''); 
    formData.append('constancia', this.selectedFiles.constancia || ''); 
    formData.append('user_id', this.idUser.toString());
    formData.append('nombre', this.Nombre);

    this.proveedorService.uploadFiles(formData).subscribe(
      (response) => {
        window.sessionStorage.setItem('archivosSubidos', 'true');
        alert('Archivos subidos con éxito');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        alert('Error al subir archivos, selecciona un archivo PDF.');
      }
    );
  }

  downloadINE() {
    this.proveedorService.getINEInfo(this.idUser).subscribe(
      (fileBlob) => {
        const blob = new Blob([fileBlob], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `INE_${this.idUser}.pdf`;
        link.click();
      },
      (error) => {
        console.error('Error al descargar archivo INE', error);
        // Puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );
  }
  
  downloadConstancia() {
    this.proveedorService.getConstanciaInfo(this.idUser).subscribe(
      (fileBlob) => {
        const blob = new Blob([fileBlob], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Constancia_${this.idUser}.pdf`;
        link.click();
      },
      (error) => {
        console.error('Error al descargar archivo Constancia', error);
        // Puedes mostrar un mensaje de error al usuario si es necesario.
      }
    );
  }

  deleteFile1(fileType: 'INE' | 'Constancia') {
    const deleteObservable =
      fileType === 'INE' ? this.proveedorService.deleteINE(this.idUser) : this.proveedorService.deleteConstancia(this.idUser);
  
    deleteObservable.subscribe(
      (deleteResponse) => {
        alert(`Archivo ${fileType} eliminado con éxito.`);
      },
      (deleteError) => {
        if (deleteError.status === 404) {
          alert(`El archivo ${fileType} no existe.`);
        } else {
          console.error(`Error al eliminar archivo ${fileType}`, deleteError);
          alert(`Error al eliminar archivo ${fileType}`);
        }
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

  deleteFile(field: 'ine' | 'constancia') {
    this.setFile(field, null);
  }

  replaceINE() {
    try {
      this.openFileReplaceDialog('ine');
    } catch (error) {
      console.error('Error al abrir el diálogo para reemplazar INE', error);
    }
  }

  replaceConstancia() {
    try {
      this.openFileReplaceDialog('constancia');
    } catch (error) {
      console.error('Error al abrir el diálogo para reemplazar Constancia', error);
    }
  }

  openFileReplaceDialog(fileType: 'ine' | 'constancia') {
    const dialogRef = this.dialog.open(FileReplaceDialogComponent, {
      data: { fileType },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(
      (result: File) => {
        if (result) {
          console.log('Nuevo archivo seleccionado:', result);

          if (fileType === 'ine') {
            this.proveedorService.replaceINE(this.idUser, result).subscribe(
              (response) => {
                alert('Archivo INE reemplazado con éxito');
                // Puedes realizar acciones adicionales si es necesario
              },
              (error) => {
                alert('Error al reemplazar el archivo INE');
                // Manejar el error y mostrar mensajes al usuario si es necesario
              }
            );
          } else if (fileType === 'constancia') {
            this.proveedorService.replaceConstancia(this.idUser, result).subscribe(
              (response) => {
                alert('Archivo Constancia reemplazado con éxito');
                // Puedes realizar acciones adicionales si es necesario
              },
              (error) => {
                alert('Error al reemplazar el archivo Constancia');
                // Manejar el error y mostrar mensajes al usuario si es necesario
              }
            );
          }
        }
      },
      (error) => {
        console.error('Error al cerrar el diálogo', error);
      }
    );
  }
}


