import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NivelEducativoService } from '../../../services/nivel-educativo-service';
import { NivelEducativo } from '../../../models/nivelEducativo';

@Component({
  selector: 'app-nivel-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './nivel-component.html',
  styleUrl: './nivel-component.css'
})
export class NivelComponent {


  nivel: NivelEducativo = {
    nombre: '',
    descripcion: '',
    id: 0,
    activo: false
  };
  niveles: NivelEducativo[] = [];
  messageError: string = '';

  constructor(private nivelService: NivelEducativoService) { }

  ngOnInit() {
    this.cargarNiveles();
  }

  cargarNiveles() {
    this.nivelService.obtenerNivelesEducativos().subscribe({
      next: (data) => {
        this.niveles = data;
      },
      error: (e) => {
        console.log('No se pudieron cargar los niveles educativos.', e);
      }
    });
  }

  formSubmit(nivel: NivelEducativo, form: NgForm) {
    if (form.invalid) {
      return; // no continúa si el formulario es inválido
    }
    if (nivel.id && nivel.id !== 0) {
      // Modo edición
      this.nivelService.updateNivel(nivel).subscribe(updatedNivel => {
        const index = this.niveles.findIndex(u => u.id === updatedNivel.id);
        if (index !== -1) {
          this.niveles[index] = updatedNivel;
        }
        this.resetForm(form);
      });
    } else {
      // Modo agregar
      // Elimina el ID antes de enviarlo al backend
      const { id, ...nivelWithoutId } = nivel;

      this.nivelService.createNivel(nivelWithoutId as NivelEducativo).subscribe(newNivel => {
        this.niveles.push(newNivel);
        this.resetForm(form);
      });
    }
  }

  confirmDelete(nivelId: number): void {
    const confirmado = window.confirm('¿Está seguro de que desea eliminar este nivel educativo?');
    if (confirmado) {
      this.deleteNivel(nivelId);
    }
  }

  deleteNivel(id: number) {
    this.nivelService.deleteNivel(id).subscribe(() => {
      this.niveles = this.niveles.filter(n => n.id !== id);
    });
  }

  editNivel(selectedNivel: NivelEducativo) {
    this.nivel = { ...selectedNivel };
  }

  resetForm(form?: NgForm) {
    this.nivel = {
      id: 0,
      nombre: '',
      descripcion: '',
      activo: false
    };
    if (form) {
      form.resetForm(); // <-- aquí se reinicia el estado del formulario
    }
  }

}
