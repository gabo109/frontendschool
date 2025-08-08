import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Area } from '../../../models/area';
import { AreaService } from '../../../services/area-service';

@Component({
  selector: 'app-area-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './area-component.html',
  styleUrl: './area-component.css'
})
export class AreaComponent {
  
  area: Area = {
    nombre: '',
    id: 0,
    activo: false
  };
  areas: Area[] = [];
  messageError: string = '';

  constructor(private areaService: AreaService) { }

  ngOnInit() {
    this.cargarAreas();
  }

  cargarAreas() {
    this.areaService.obtenerAreas().subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (e) => {
        console.log('No se pudieron cargar las áreas.', e);
      }
    });
  }

  formSubmit(area: Area, form: NgForm) {
    if (form.invalid) {
      return; // no continúa si el formulario es inválido
    }
    if (area.id && area.id !== 0) {
      // Modo edición
      this.areaService.updateArea(area).subscribe(updatedArea => {
        const index = this.areas.findIndex(u => u.id === updatedArea.id);
        if (index !== -1) {
          this.areas[index] = updatedArea;
        }
        this.resetForm(form);
      });
    } else {
      // Modo agregar
      // Elimina el ID antes de enviarlo al backend
      const { id, ...areaWithoutId } = area;

      this.areaService.createArea(areaWithoutId as Area).subscribe(newArea => {
        this.areas.push(newArea);
        this.resetForm(form);
      });
    }
  }

  confirmDelete(areaId: number): void {
    const confirmado = window.confirm('¿Está seguro de que desea eliminar esta área?');
    if (confirmado) {
      this.deleteArea(areaId);
    }
  }

  deleteArea(id: number) {
    this.areaService.deleteArea(id).subscribe(() => {
      this.areas = this.areas.filter(n => n.id !== id);
    });
  }

  editArea(selectedArea: Area) {
    this.area = { ...selectedArea };
  }

  resetForm(form?: NgForm) {
    this.area = {
      id: 0,
      nombre: '',
      activo: false
    };
    if (form) {
      form.resetForm(); // <-- aquí se reinicia el estado del formulario
    }
  }
}
