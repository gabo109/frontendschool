import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NivelAreaAsignaturaService {

  constructor(private http: HttpClient) { }

  public createArea(area: Area): Observable<Area> {
    return this.http.post<Area>(`${baserUrl}/area/add`, area);
  }

  public updateArea(area: Area): Observable<Area> {
    return this.http.put<Area>(`${baserUrl}/area/update`, area);
  }

  public deleteArea(id: number): Observable<void> {
    return this.http.delete<void>(`${baserUrl}/area/delete/${id}`);
  }

  public obtenerAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${baserUrl}/area/all`).pipe(
      catchError(err => {
        console.error('Error cargando áreas', err);
        throw err;
      })
    );
  }

}
