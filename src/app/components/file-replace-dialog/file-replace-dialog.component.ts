import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-file-replace-dialog',
  template: `
    <div class="file-replace-dialog">
      <h2 mat-dialog-title>{{ data.fileType | uppercase }}</h2>
      <div class="contenedor-entrada-archivo">
        <input type="file" (change)="onFileChange($event)" />
        <div class="indicador-archivo-seleccionado">
          </div>
      </div>
      <button mat-button [mat-dialog-close]="selectedFile" class="button" >Reemplazar</button>
    </div>
  `,
  styleUrls: ['file-replace-dialog.component.css']
})
export class FileReplaceDialogComponent {
  selectedFile: File | undefined;

  constructor(
    public dialogRef: MatDialogRef<FileReplaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fileType: string }
  ) {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}