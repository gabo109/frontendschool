import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asignatura } from '../models/asignatura';
import { catchError, Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  
  constructor(private http: HttpClient) { }

  public createAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${baserUrl}/asignatura/add`, asignatura);
  }

  public updateAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.put<Asignatura>(`${baserUrl}/asignatura/update`, asignatura);
  }

  public deleteAsignatura(id: number): Observable<void> {
    return this.http.delete<void>(`${baserUrl}/asignatura/delete/${id}`);
  }

  public obtenerAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${baserUrl}/asignatura/all`).pipe(
      catchError(err => {
        console.error('Error cargando asignaturas', err);
        throw err;
      })
    );
  }

}
