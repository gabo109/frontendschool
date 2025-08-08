import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class InformacionDocenteService {

  constructor(private http: HttpClient) {}

  getByUsuario(usuario: string): Observable<any> {
    return this.http.get(`${baserUrl}/informacion-docente/${usuario}`);
  }

  crearInformacion(data: any): Observable<any> {
    return this.http.post(`${baserUrl}/informacion-docente/add`, data);
  }  

  actualizarInformacion(data: any): Observable<any> {
    return this.http.put(`${baserUrl}/informacion-docente/update`, data);
  }

}
