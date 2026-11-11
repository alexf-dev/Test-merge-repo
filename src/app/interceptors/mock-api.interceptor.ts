import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;

    // 1. Перехватываем проверку двухфакторной аутентификации
    if (url.includes('/isTwoFactorAuthorization')) {
      return of(new HttpResponse({ status: 200, body: { response: false } })).pipe(delay(300));
    }

    // 2. Перехватываем запрос на логин
    if (url.includes('/custom-login')) {
      return of(new HttpResponse({
        status: 200,
        body: {
          accessTokenResponse: {
            access_token: 'mock-jwt-access-token-12345',
            refresh_token: 'mock-jwt-refresh-token-67890'
          }
        }
      })).pipe(delay(500));
    }

    // 3. Перехватываем загрузку профиля (/api/me)
    if (url.includes('/api/me')) {
      const mockProfile = {
        id: 'mock-user-id',
        userName: 'test_user',
        firstName: 'Тестовый',
        lastName: 'Пользователь',
        roles: ['ROLE_ADMIN', 'ROLE_USER'], // Добавь роли, нужные для отображения меню
        actions: ['read', 'write', 'delete'] // Добавь экшены, если они проверяются в UI
      };
      return of(new HttpResponse({ status: 200, body: mockProfile })).pipe(delay(300));
    }

    // 4. Перехватываем refresh token (на случай, если приложение попытается его обновить)
    if (url.includes('/refresh')) {
      return of(new HttpResponse({
        status: 200,
        body: { accessTokenResponse: { access_token: 'new-mock-token' } }
      })).pipe(delay(300));
    }

    // Если запрос не наш (например, загрузка локальных JSON файлов i18n или assets), пропускаем его дальше
    return next.handle(request);
  }
}
