import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable, catchError } from 'rxjs';
import { NivelEducativo } from '../models/nivelEducativo';

@Injectable({
  providedIn: 'root'
})
export class NivelEducativoService {

  constructor(private http: HttpClient) { }

  public obtenerNivelesEducativosActivos(): Observable<NivelEducativo[]> {
    return this.http.get<NivelEducativo[]>(`${baserUrl}/nivel-educativo/activos`).pipe(
      catchError(err => {
        console.error('Error cargando niveles educativos activos', err);
        throw err;
      })
    );
  }

  public obtenerNivelesEducativos(): Observable<NivelEducativo[]> {
    return this.http.get<NivelEducativo[]>(`${baserUrl}/nivel-educativo/all`).pipe(
      catchError(err => {
        console.error('Error cargando niveles educativos', err);
        throw err;
      })
    );
  }

  public getAreasByNivel(nivelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/nivel-educativo/${nivelId}/areas`);
  }

  public getAsignaturasByNivelAndArea(nivelId: number, areaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/nivel-educativo/${nivelId}/areas/${areaId}/asignaturas`);
  }

  public createNivel(nivel: NivelEducativo): Observable<NivelEducativo> {
    return this.http.post<NivelEducativo>(`${baserUrl}/nivel-educativo/add`, nivel);
  }

  public updateNivel(nivel: NivelEducativo): Observable<NivelEducativo> {
    return this.http.put<NivelEducativo>(`${baserUrl}/nivel-educativo/update`, nivel);
  }

  public deleteNivel(id: number): Observable<void> {
    return this.http.delete<void>(`${baserUrl}/nivel-educativo/delete/${id}`);
  }

}
