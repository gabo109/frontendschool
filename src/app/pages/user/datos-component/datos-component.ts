import { Component, OnInit } from '@angular/core';
import { NivelEducativoService } from '../../../services/nivel-educativo-service';
import { NivelEducativo } from '../../../models/nivelEducativo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login-service';
import { InformacionDocenteService } from '../../../services/informacion-docente-service';

interface Area {
  id: number;
  nombre: string;
}

interface Asignatura {
  id: number;
  nombre: string;
}

interface InformacionDocente {
  anioLectivo: string;
  usuario: string;
  nivelEducativo: NivelEducativo | null;
  area: Area | null;
  asignatura: Asignatura | null;
  curso: string;
  paralelo: string;
}

@Component({
  selector: 'app-datos-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './datos-component.html',
  styleUrl: './datos-component.css'
})
export class DatosComponent implements OnInit {

  niveles: NivelEducativo[] = [];
  areas: any[] = [];
  asignaturas: any[] = [];

  nivelSeleccionado: NivelEducativo | null = null;
  areaSeleccionada: Area | null = null;
  asignaturaSeleccionada: Asignatura | null = null;

  user: any = null;
  nombreCompleto: string = '';
  messageError: string = '';
  messageSuccess: string = '';
  registroExiste: boolean = false;

  informacion: InformacionDocente = {
    anioLectivo: '',
    usuario: '',
    nivelEducativo: null,
    area: null,
    asignatura: null,
    curso: '',
    paralelo: ''
  };

  constructor(private nivelService: NivelEducativoService,
    private loginService: LoginService,
    private informacionDocenteService: InformacionDocenteService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    if (this.user) {
      this.nombreCompleto = `${this.user.nombre} ${this.user.apellido}`;
      this.informacion.usuario = this.user.username;
    }

    this.nivelService.obtenerNivelesEducativosActivos().subscribe({
      next: (data) => {
        this.niveles = data;

      },
      error: (e) => {
        console.log('No se pudieron cargar los niveles educativos.', e);
      }
    });

    this.informacionDocenteService.getByUsuario(this.informacion.usuario).subscribe({
      next: (data) => {
        if (data) {
          this.informacion = data;
          this.registroExiste = true;

          // Cargar selectores si tienes lógica personalizada
          this.nivelSeleccionado = this.niveles.find(n => n.id === data.nivelEducativo.id) || null;
          // Cargar áreas basadas en nivel
          if (this.nivelSeleccionado) {
            this.nivelService.getAreasByNivel(this.nivelSeleccionado.id).subscribe(areasData => {
              this.areas = areasData;
              this.areaSeleccionada = this.areas.find(a => a.id === data.area.id) || null;

              // Cargar asignaturas basadas en área
              if (this.nivelSeleccionado && this.areaSeleccionada) {
                this.nivelService.getAsignaturasByNivelAndArea(this.nivelSeleccionado.id, this.areaSeleccionada.id).subscribe(asignaturasData => {
                  this.asignaturas = asignaturasData;
                  this.asignaturaSeleccionada = this.asignaturas.find(a => a.id === data.asignatura.id) || null;
                });
              }
            });
          }

        }
      },
      error: (err) => {
        console.error('Error al consultar información del docente:', err);
      }
    });
  }

  formSubmit(): void {
    this.messageError = '';
    if (!this.nivelSeleccionado || !this.areaSeleccionada || !this.asignaturaSeleccionada || !this.informacion.curso || !this.informacion.paralelo
      || !this.informacion.anioLectivo
    ) {
      this.messageError = 'Debe ingresar todos los campos';
      return;
    }

    this.informacion.nivelEducativo = this.nivelSeleccionado;
    this.informacion.area = this.areaSeleccionada;
    this.informacion.asignatura = this.asignaturaSeleccionada;
    console.log('Información a enviar:', this.informacion);


    if (this.registroExiste) {
      // Actualizar información
      this.informacionDocenteService.actualizarInformacion(this.informacion).subscribe({
        next: () => {
          this.messageSuccess = 'Información actualizada correctamente.';
        },
        error: () => {
          this.messageError = 'Error al actualizar la información.';
        }
      });
    } else {
      // Guardar
      this.informacionDocenteService.crearInformacion(this.informacion).subscribe({
        next: (respuesta) => {
          this.messageSuccess = 'Información registrada correctamente.';
          this.registroExiste = true;
          /* this.informacion = { anioLectivo: '', usuario: '', nivel: 0, area: 0, asignatura: 0, curso: '', paralelo: '' };
           this.nivelSeleccionado = null;
           this.areaSeleccionada = null;
           this.asignaturaSeleccionada = null;*/
        },
        error: (err) => {
          console.error(err);
          this.messageError = 'Error al registrar la información.';
        }
      });
    }

  }

  onNivelChange(): void {
    console.log('Nivel seleccionado:', this.nivelSeleccionado);
    this.areaSeleccionada = null;
    this.asignaturas = [];
    if (this.nivelSeleccionado) {
      this.nivelService.getAreasByNivel(this.nivelSeleccionado.id).subscribe(data => {
        this.areas = data;
      });
    }
  }

  onAreaChange() {
    this.asignaturaSeleccionada = null;
    console.log('Área seleccionada:', this.areaSeleccionada);
    if (this.nivelSeleccionado && this.areaSeleccionada) {
      this.nivelService.getAsignaturasByNivelAndArea(this.nivelSeleccionado.id, this.areaSeleccionada.id).subscribe(data => {
        this.asignaturas = data;
      });
    }
  }

  onAsignaturaChange() {
    console.log('Asignatura seleccionada:', this.asignaturaSeleccionada);
  }

}
