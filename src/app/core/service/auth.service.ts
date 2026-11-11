import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError
} from 'rxjs';

interface AccessTokenResponse {
  access_token?: string;
  refresh_token?: string;
}

interface AuthResponse {
  accessTokenResponse?: AccessTokenResponse;
  access_token?: string;
  refresh_token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly profileSubject = new BehaviorSubject<any | null>(null);

  readonly profile$ = this.profileSubject.asObservable();

  private readonly loginUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/custom-login';

  private readonly changePassUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/auth/public/v1/change-pass';

  private readonly changePassEdsUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/auth/public/v1/change-pass-eds';

  private readonly isTwoFactorUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/auth/public/v1/isTwoFactorAuthorization';

  private readonly checkSignUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/auth/public/v1/checkSign';

  private readonly checkLoginPassUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/auth/public/v1/checkLoginPass';

  private readonly refreshTokenUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/refresh';

  private readonly apiMeUrl =
    'https://test-cbdi-gateway.enbek.kz/auth-server/api/me';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.restoreProfileFromStorage();
  }

  login(username: string, password: string, signedXml?: string): Observable<any> {
    const body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    if (signedXml) {
      body.set('customParam', signedXml);
    }

    return this.http.post<AuthResponse>(
      this.loginUrl, body.toString(),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).pipe(
      tap(response => {
        if (!this.setTokensFromResponse(response)) {
          throw new Error('Access token отсутствует');
        }
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token отсутствует'));
    }

    return this.http.post<AuthResponse>(
      this.refreshTokenUrl,
      {refreshToken},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }


  setTokensFromResponse(response: AuthResponse | null | undefined): boolean {
    const tokenResponse = response?.accessTokenResponse ?? response;
    const accessToken = tokenResponse?.access_token;
    const refreshToken = tokenResponse?.refresh_token;

    if (!accessToken) {
      return false;
    }

    localStorage.setItem('access_token', accessToken);

    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }

    return true;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  hasStoredTokens(): boolean {
    return Boolean(this.getAccessToken() || this.getRefreshToken());
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  logout(): void {
    this.clearTokens();
    this.setProfile(null);
    void this.router.navigate(['/auth/login']);
  }


  loadProfile(): Observable<any | null> {
    if (!this.hasStoredTokens()) {
      this.setProfile(null);
      return of(null);
    }

    return this.http.get<any>(this.apiMeUrl).pipe(
      tap(profile => this.setProfile(profile)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.setProfile(null);
        }
        return throwError(() => error);
      })
    );
  }

  hasValidToken(): boolean {
    const token = this.getAccessToken();

    if (!token) {
      return false;
    }

    try {
      const payload = this.decodeJwtPayload(token);
      const now = Math.floor(Date.now() / 1000);

      return typeof payload?.exp === 'number' && payload.exp > now;
    } catch {
      return false;
    }
  }

  setProfile(profile: any | null): void {
    if (profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    } else {
      localStorage.removeItem('profile');
    }

    this.profileSubject.next(profile);
  }

  getProfile(): any | null {
    return this.profileSubject.value;
  }

  hasAction(action: string): boolean {
    return this.profileSubject.value?.actions?.includes(action) ?? false;
  }

  hasAnyAction(...actions: string[]): boolean {
    const userActions = this.profileSubject.value?.actions ?? [];

    return actions.some((action) => userActions.includes(action));
  }

  hasRole(role: string): boolean {
    const roles: string[] = this.profileSubject.value?.roles ?? [];
    return roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles: string[] = this.profileSubject.value?.roles ?? [];
    return roles.some((role) => userRoles.includes(role));
  }

  changePass(username: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(
      this.changePassUrl,
      {username, oldPassword, newPassword},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  changePassEds(username: string, oldPassword: string, newPassword: string, signedXml: string): Observable<any> {
    return this.http.post(
      this.changePassEdsUrl,
      {username, oldPassword, newPassword, signedXml},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  checkLoginPass(username: string, password: string): Observable<any> {
    return this.http.post(
      this.checkLoginPassUrl,
      {username, password},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  checkSign(username: string, signedXml: string): Observable<any> {
    return this.http.post(
      this.checkSignUrl,
      {
        username,
        customParam: signedXml
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  isTwoFactorAuthorization(): Observable<any> {
    return this.http.get(
      this.isTwoFactorUrl,
      {withCredentials: true}
    );
  }

  private restoreProfileFromStorage(): void {
    try {
      const storedProfile = localStorage.getItem('profile');

      if (storedProfile) {
        this.profileSubject.next(JSON.parse(storedProfile));
      }
    } catch {
      localStorage.removeItem('profile');
      this.profileSubject.next(null);
    }
  }

  private decodeJwtPayload(token: string): any {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Некорректный JWT');
    }

    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    base64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));

    return JSON.parse(new TextDecoder().decode(bytes));
  }
}
