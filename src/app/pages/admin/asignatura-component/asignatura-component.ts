import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Asignatura } from '../../../models/asignatura';
import { AsignaturaService } from '../../../services/asignatura-service';

@Component({
  selector: 'app-asignatura-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './asignatura-component.html',
  styleUrl: './asignatura-component.css'
})
export class AsignaturaComponent {

  asignatura: Asignatura = {
    nombre: '',
    id: 0,
    activo: false
  };
  asignaturas: Asignatura[] = [];
  messageError: string = '';

  constructor(private asignaturaService: AsignaturaService) { }

  ngOnInit() {
    this.cargarAsignaturas();
  }

  cargarAsignaturas() {
    this.asignaturaService.obtenerAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data;
      },
      error: (e) => {
        console.log('No se pudieron cargar las asignaturas.', e);
      }
    });
  }

  formSubmit(asignatura: Asignatura, form: NgForm) {
    if (form.invalid) {
      return; // no continúa si el formulario es inválido
    }
    if (asignatura.id && asignatura.id !== 0) {
      // Modo edición
      this.asignaturaService.updateAsignatura(asignatura).subscribe(updatedAsignatura => {
        const index = this.asignaturas.findIndex(u => u.id === updatedAsignatura.id);
        if (index !== -1) {
          this.asignaturas[index] = updatedAsignatura;
        }
        this.resetForm(form);
      });
    } else {
      // Modo agregar
      // Elimina el ID antes de enviarlo al backend
      const { id, ...asignaturaWithoutId } = asignatura;

      this.asignaturaService.createAsignatura(asignaturaWithoutId as Asignatura).subscribe(newAsignatura => {
        this.asignaturas.push(newAsignatura);
        this.resetForm(form);
      });
    }
  }

  confirmDelete(asignaturaId: number): void {
    const confirmado = window.confirm('¿Está seguro de que desea eliminar esta asignatura?');
    if (confirmado) {
      this.deleteAsignatura(asignaturaId);
    }
  }

  deleteAsignatura(id: number) {
    this.asignaturaService.deleteAsignatura(id).subscribe(() => {
      this.asignaturas = this.asignaturas.filter(n => n.id !== id);
    });
  }

  editAsignatura(selectedAsignatura: Asignatura) {
    this.asignatura = { ...selectedAsignatura };
  }

  resetForm(form?: NgForm) {
    this.asignatura = {
      id: 0,
      nombre: '',
      activo: false
    };
    if (form) {
      form.resetForm(); // <-- aquí se reinicia el estado del formulario
    }
  }
}
