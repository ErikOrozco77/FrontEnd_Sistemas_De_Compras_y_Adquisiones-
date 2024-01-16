import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor-detalle',
  template: `
    <br>
    <h2>Detalles del Proveedor:</h2>
    <div class="scroll-container">
    <ul>
    <table class="detalle-table">
      <tr *ngFor="let field of fields">
        <td><strong>{{ field.label }}</strong></td>
        <td>{{ getFieldValue(field) }}</td>
      </tr>
    </table>
    </ul>
    </div>
  `,
  styleUrls: ['./proveedor-detalle.component.css']
})

export class ProveedorDetalleComponent {
  fields = [
    { label: 'Id', property: 'id' },
    { label: 'Nombre', property: 'nombre' },
    {label:'Primer apellido',property: 'primerApellido' },
    {label:'Segundo apellido',property: 'segundoApellido' },
    {label:'Razon social',property: 'razonSocial' },
    {label:'Estratificación',property: 'estratificacion' },
    {label:'Pais de origen',property: 'paisOrigen' },
    {label:'RFC',property: 'rfc' },
    { label: 'Actividad Economica', property: 'actividadEconomica' },
    { label: 'Domicilio', property: 'domicilioNombre' },
    { label: 'N° Interior', property: 'domicilioNumeroInterior' },
    { label: 'N° Exterior', property: 'domicilioNumeroExterior' },
    { label: 'Nombre del Asentamiento', property: 'domicilioNombreAsentamiento' },
    { label: 'Clave de Localidad', property: 'domicilioClaveLocalidad' },
    { label: 'Nombre de la Localidad', property: 'domicilioNombreLocalidad' },
    { label: 'Clave del Municipio', property: 'domicilioClaveMunicipio' },
    { label: 'Nombre del Municipio', property: 'domicilioNombreMunicipio' },
    { label: 'Clave de Entidad', property: 'domicilioClaveEntidad' },
    { label: 'Codigo Postal', property: 'domicilioCP' },
    { label: 'Pais Extranjero', property: 'extranjeroPais' },
    { label: 'Ciudad Extranjera', property: 'extranjeroCiudad' },
    { label: 'Calle Extranjera', property: 'extranjeroCalle' },
    { label: 'Numero Extranjero', property: 'extranjeroNumero' },
    { label: 'Nombre del Representante Legal', property: 'representanteLegalNombre' },
    { label: 'Primer Apellido del Representante Legal', property: 'representanteLegalPrimerApellido' },
    { label: 'Segundo Apellido del Representante Legal', property: 'representanteLegalSegundoApellido' },
    { label: 'Telefono del Representante Legal', property: 'representanteLegalTelefono' },
    { label: 'Email del Representante Legal', property: 'representanteLegalMail' },
    { label: 'Sitio Web', property: 'website' },
    { label: 'Telefono', property: 'telefono' },

    { label: 'Sexo', property: 'CatSexo' },
    { label: 'Origen', property: 'CatOrigen' },
    { label: 'Entidad Federativa', property: 'CatEntidadFederativa' },
    { label: 'Subcontrataciones', property: 'CatRealizaSubcontrataciones' },
    { label: 'Domicilio Vialidad', property: 'CatDomicilioVialidad' },
    { label: 'Tipo de Asentamiento', property: 'CatDomicilioTipoAsentamiento' },
    { label: 'Domicilio Entidad Federativa', property: 'CatDomicilioEntidadFederativa' },
    { label: 'Tipo de Acreditación del Representante Legal', property: 'CatRepresentanteLegalTipoAcreditacion' },
    { label: 'Giro' , property: 'CatGiro'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  getFieldValue(field: any): string {
    const fieldValue = this.data[field.property];
    if (fieldValue && fieldValue.descripcion) {
      return fieldValue.descripcion;
    } else {
      return fieldValue; 
    }
  }
}