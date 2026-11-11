import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {
  catchError,
  finalize,
  map,
  Observable,
  shareReplay,
  switchMap,
  throwError
} from 'rxjs';
import {AuthService} from '../core/service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly backendBaseUrl =
    'https://test-cbdi-gateway.enbek.kz/';

  /**
   * Пока refresh выполняется, все параллельные запросы используют
   * один и тот же Observable. Поэтому они не запускают несколько refresh
   * и не зависают при ошибке.
   */
  private refreshRequest$: Observable<string> | null = null;

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isBackendRequest(request.url) || this.isPublicRequest(request.url)) {
      return next.handle(request);
    }

    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();

    if (accessToken && this.authService.hasValidToken()) {
      return next.handle(this.addToken(request, accessToken)).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 401) {
            return throwError(() => error);
          }

          const currentToken = this.authService.getAccessToken();

          if (currentToken && currentToken !== accessToken && this.authService.hasValidToken()) {
            return next.handle(
              this.addToken(request, currentToken)
            );
          }

          if (this.authService.getRefreshToken()) {
            return this.refreshAndRetry(request, next);
          }

          return throwError(() => error);
        })
      );
    }

    if (refreshToken) {
      return this.refreshAndRetry(request, next);
    }

    return next.handle(request);
  }

  private refreshAndRetry(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.getRefreshedAccessToken().pipe(
      switchMap((newAccessToken) =>
        next.handle(this.addToken(request, newAccessToken))
      )
    );
  }

  private getRefreshedAccessToken(): Observable<string> {
    if (!this.refreshRequest$) {
      this.refreshRequest$ = this.authService.refreshToken().pipe(
        map((response) => {
          const tokensSaved =
            this.authService.setTokensFromResponse(response);

          const newAccessToken =
            this.authService.getAccessToken();

          if (!tokensSaved || !newAccessToken) {
            throw new Error(
              'В ответе refresh отсутствует access token'
            );
          }

          return newAccessToken;
        }),
        catchError((error: HttpErrorResponse) => {

          if (error.status === 401) {
            this.authService.logout();
          }

          return throwError(() => error);
        }),
        finalize(() => {
          this.refreshRequest$ = null;
        }),
        shareReplay({
          bufferSize: 1,
          refCount: false
        })
      );
    }

    return this.refreshRequest$;
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isBackendRequest(url: string): boolean {
    return url.startsWith(this.backendBaseUrl);
  }

  private isPublicRequest(url: string): boolean {
    return (
      url.includes('/custom-login') ||
      url.includes('/refresh') ||
      url.includes('/api/auth/public/')
    );
  }
}
