import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
/*
@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public login: LoginService) { }

  ngOnInit(): void {

  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }
}*/
interface MenuItem {
  label: string;
  route?: string;
  icon?: string;
  action?: () => void; // para logout u otras acciones
  roles: string[]; // roles permitidos
}

@Component({
  selector: 'app-sidebar-component',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})
export class SidebarComponent implements OnInit {
  userRole: string | null = null;

  menu: MenuItem[] = [
    { label: 'Inicio', route: '/admin', icon: '🏠', roles: ['ADMIN'] },
    { label: 'Inicio', route: '/user', icon: '🏠', roles: ['USER'] },
    { label: 'Perfil', route: '/admin/profile', icon: '👤', roles: ['ADMIN'] },
    { label: 'Perfil', route: '/user/profile', icon: '👤', roles: ['USER'] },
    { label: 'Usuario', route: '/admin/signup', icon: '📋', roles: ['ADMIN'] },
    { label: 'Datos Informativos', route: '/user/datos-component', icon: '➕', roles: ['USER'] },
    { label: 'Nivel Educativo', route: '/admin/nivel-component', icon: '📋', roles: ['ADMIN'] },
    { label: 'Área', route: '/admin/area-component', icon: '📋', roles: ['ADMIN'] },
    { label: 'Asignatura', route: '/admin/asignatura-component', icon: '📋', roles: ['ADMIN'] },

  ];

  constructor(public login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userRole = this.login.getUserRole(); // asume que devuelve 'ADMIN' o 'USER'
  }

  isVisible(item: MenuItem): boolean {
    return this.userRole ? item.roles.includes(this.userRole) : false;
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['']); // redirige al login sin hacer reload completo
  }
}

