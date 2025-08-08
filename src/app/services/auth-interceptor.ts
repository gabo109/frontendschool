import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private isHandlingExpired = false;

  constructor(private loginService: LoginService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.loginService.getToken();
    if (token) {
      authReq = authReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          const body = err.error || {};
          const sessionExpired =
            body.error === 'token_expired' ||
            (err.headers && err.headers.get && err.headers.get('X-Session-Expired') === 'true');

          if (sessionExpired) {
            // prevenir múltiples redirecciones
            if (!this.isHandlingExpired) {
              this.isHandlingExpired = true;
              this.handleSessionExpired();
            }
          }
        }
        return throwError(() => err);
      })
    );
  }

  private handleSessionExpired() {
    // Limpia cualquier dato de sesión
    this.loginService.clearToken();
    // Puedes mostrar un mensaje bonito según tu UI (toast, snackbar, etc.)
    // Redirige al login con query param para mostrar mensaje contextual
    this.router.navigate([''], { queryParams: { expired: 'true' } }).finally(() => {
      this.isHandlingExpired = false;
    });
  }  

}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
]
