import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'app-signup-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.css'
})
export class SignupComponent implements OnInit {


  userData: { username: string; password: string; nombre: string; apellido: string; email: string; telefono: string } = {
    "username": '',
    "password": '',
    "nombre": '',
    "apellido": '',
    "email": '',
    "telefono": ''
  }

  messageError: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  formSubmit() {
    console.log(this.userData);
    if (!this.userData.username || !this.userData.password || !this.userData.nombre || !this.userData.apellido || !this.userData.email || !this.userData.telefono) {
      this.messageError = 'Debe ingresar todos los campos';
      return;
    }

    this.userService.agregarUsuario(this.userData).subscribe({
      next: (data) => {
        console.log(data);
        this.messageError = 'Usuario registrado correctamente';
        this.userData = { username: '', password: '', nombre: '', apellido: '', email: '', telefono: '' }; // Reset form
      },
      error: (error) => {
        console.error(error);
        this.messageError = 'Error al registrar usuario';
      }
    });
  }

}
