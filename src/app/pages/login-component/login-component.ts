import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.css']
})
export class LoginComponent implements OnInit {

  loginData: { username: string; password: string } = {
    "username": '',
    "password": '',
  }

  loginError: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  formSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      this.loginError = 'Debe ingresar usuario y contraseña';
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe({
      next: (data) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user) => {
            this.loginService.setUser(user);
            const role = this.loginService.getUserRole();

            if (role === 'ADMIN') {
              this.router.navigate(['admin']);
            } else if (role === 'USER') {
              this.router.navigate(['user']);
            } else {
              this.loginService.logout();
            }

            this.loginService.loginStatusSubjec.next(true);
          }
        });
      },
      error: (error) => {
        console.error(error);
        this.loginError = 'Credenciales inválidas';
      }
    });
  }

}
