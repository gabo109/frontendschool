import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tokenKey = 'token';
  private userKey = 'user';

  public loginStatusSubjec = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  // Generar token
  public generateToken(loginData: { username: string; password: string }): Observable<any> {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  // Obtener usuario actual
  public getCurrentUser(){
    return this.http.get(`${baserUrl}/actual-usuario`);
  }

  // Guardar token
  public loginUser(token: string): boolean {
    localStorage.setItem(this.tokenKey, token);
    return true;
  }

  // Verificar si hay sesión activa
  public isLoggedIn(): boolean {
    const tokenStr = localStorage.getItem(this.tokenKey);
    return !!tokenStr;
  }

  // Cerrar sesión
  public logout(): boolean {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    return true;
  }

  // Obtener token
  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Guardar usuario
  public setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Obtener usuario
  public getUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        this.logout();
        return null;
      }
    }
    this.logout();
    return null;
  }

  // Obtener rol del usuario
  public getUserRole(): string | null {
    const user = this.getUser();
    if (user && user.authorities && user.authorities.length > 0) {
      return user.authorities[0].authority;
    }
    return null;
  }
}
