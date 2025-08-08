import { Component } from '@angular/core';
import { AreaService } from '../../../services/area-service';
import { NivelEducativoService } from '../../../services/nivel-educativo-service';
import { AsignaturaService } from '../../../services/asignatura-service';
import { NivelEducativo } from '../../../models/nivelEducativo';
import { NgForm } from '@angular/forms';
import { Area } from '../../../models/area';
import { Asignatura } from '../../../models/asignatura';
import { NivelAreaAsignaturaService } from '../../../services/nivel-area-asignatura-service';
import { NivelAreaAsignatura } from '../../../models/NivelAreaAsignatura';

@Component({
  selector: 'app-asignacion-component',
  imports: [],
  templateUrl: './asignacion-component.html',
  styleUrl: './asignacion-component.css'
})
export class AsignacionComponent {

  niveles: NivelEducativo[] = [];
  areas: Area[] = [];
  asignaturas: Asignatura[] = [];

  nivelSeleccionado: NivelEducativo | null = null;
  areaSeleccionada: Area | null = null;
  asignaturaSeleccionada: Asignatura | null = null;

  asignacion: NivelAreaAsignatura = {
    nivelEducativo: null,
    area: null,
    asignatura: null
  };
  asignaciones: NivelAreaAsignatura[] = [];
  messageError: string = '';

  constructor(private nivelService: NivelEducativoService,
    private areaService: AreaService,
    private asignaturaService: AsignaturaService,
    private nivelAreaAsignaturaService: NivelAreaAsignaturaService) { }

  ngOnInit(): void {
    this.cargarNiveles();
    this.cargarAreas();
    this.cargarAsignaturas();
  }

  cargarNiveles() {
    this.nivelService.obtenerNivelesEducativos().subscribe({
      next: (data) => {
        this.niveles = data;
      },
      error: (e) => {
        console.error('Error al cargar los niveles educativos:', e);
      }
    });
  }

  cargarAreas() {
    this.areaService.obtenerAreas().subscribe({
      next: (data) => {
        this.areas = data;
      },
      error: (e) => {
        console.error('Error al cargar las áreas:', e);
      }
    });
  }

  cargarAsignaturas() {
    this.asignaturaService.obtenerAsignaturas().subscribe({
      next: (data) => {
        this.asignaturas = data;
      },
      error: (e) => {
        console.error('Error al cargar las asignaturas:', e);
      }
    });
  }

  formSubmit(asignacion: NivelAreaAsignatura, form: NgForm) {
    if (form.invalid) {
      return; 
    }
    if (asignacion.nivelEducativo && asignacion.area && asignacion.asignatura) {
      this.nivelAreaAsignaturaService.updateArea(area).subscribe(updatedArea => {
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

      this.nivelAreaAsignaturaService.createArea(areaWithoutId as Area).subscribe(newArea => {
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
