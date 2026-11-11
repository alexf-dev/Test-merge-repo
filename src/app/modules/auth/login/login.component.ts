import {
  AfterViewInit,
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

import { AuthService } from '../../../core/service/auth.service';
import { NotificationSharedService } from '../../../core/service/notification.shared.service';
import { UserpassSharedService } from '../../../core/service/userpass.shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  valCheck: string[] = ['remember'];

  username = '';
  password = '';

  showPassword = false;
  confirmed = false;
  display = false;

  constructor(
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly notificationSharedService:
      NotificationSharedService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userpassSharedService: UserpassSharedService
  ) {
    this.translateService.setDefaultLang('kk');
  }

  ngAfterViewInit(): void {
    const message =
      this.notificationSharedService.getMessage();

    if (message) {
      this.messageService.add(message);
      this.notificationSharedService.setMessage(undefined);
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      this.showError('Введите логин и пароль');
      return;
    }

    this.authService.isTwoFactorAuthorization().subscribe({
      next: (response) => {
        if (response?.response === true) {
          this.checkCredentialsForTwoFactor();
          return;
        }

        this.userPassLogin(this.username, this.password);
      },
      error: (error) => {
        this.handleBackendError(error);
      }
    });
  }

  userPassLogin(
    username: string,
    password: string,
    signedXml?: string
  ): void {
    this.authService
      .login(username, password, signedXml)
      .subscribe({
        next: (response) => {
          if (
            response?.accessTokenResponse &&
            this.authService.setTokensFromResponse(response)
          ) {
            this.loadProfileAndOpenMain();
            return;
          }

          if (response?.redirectUrl) {
            window.location.assign(response.redirectUrl);
            return;
          }

          if (response?.exception) {
            this.handleAuthResponseException(response);
            return;
          }

          this.showError(
            'Сервер не вернул токены авторизации'
          );
        },
        error: (error) => {
          this.handleBackendError(error);
        }
      });
  }

  private checkCredentialsForTwoFactor(): void {
    this.authService
      .checkLoginPass(this.username, this.password)
      .subscribe({
        next: (response) => {
          if (response?.response === 'SUCCESS') {
            this.userpassSharedService.setLoginPass(
              this.username,
              this.password
            );

            void this.router.navigate(
              ['sign'],
              { relativeTo: this.activatedRoute }
            );

            return;
          }

          this.showError(
            'Не удалось подтвердить логин и пароль'
          );
        },
        error: (error) => {
          this.handleBackendError(error);
        }
      });
  }

  private loadProfileAndOpenMain(): void {
    this.authService.loadProfile().subscribe({
      next: (profile) => {
        if (!profile) {
          this.authService.logout();
          this.showError(
            'Не удалось получить профиль пользователя'
          );
          return;
        }

        void this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error(
          'Не удалось загрузить профиль пользователя',
          error
        );

        this.authService.logout();
        this.showError(
          'Не удалось получить профиль пользователя'
        );
      }
    });
  }

  private handleAuthResponseException(response: any): void {
    const errorCode =
      response?.errorCode ??
      response?.exception ??
      'AUTH_ERROR';

    const customData =
      response?.customData as Record<string, unknown> | undefined;

    const customParams =
      customData?.['isParam']
        ? this.copyObjectExcept(customData, 'isParam')
        : undefined;

    this.showTranslatedError(errorCode, customParams);
  }

  private handleBackendError(error: any): void {
    console.error('Ошибка авторизации', error);

    const backendError = error?.error;

    if (!backendError) {
      this.showError(
        'Ошибка соединения с сервером авторизации'
      );
      return;
    }

    const errorCode =
      backendError.errorCode ?? 'AUTH_ERROR';

    const customData =
      backendError.customData as
        | Record<string, unknown>
        | undefined;

    const customParams =
      customData?.['isParam']
        ? this.copyObjectExcept(customData, 'isParam')
        : undefined;

    this.showTranslatedError(errorCode, customParams);
  }

  private showTranslatedError(
    errorCode: string,
    params?: Record<string, unknown>
  ): void {
    const translationKey = `MAIN.AUTH.${errorCode}`;
    const translatedMessage =
      this.translateService.instant(
        translationKey,
        params
      );

    const detail =
      translatedMessage === translationKey
        ? errorCode
        : translatedMessage;

    this.showError(detail);
  }

  private showError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary:
        this.translateService.instant('COMMON.ERROR'),
      detail,
      life: 4000
    });
  }

  private copyObjectExcept(
    source: Record<string, unknown>,
    excludedKey: string
  ): Record<string, unknown> {
    const copy = { ...source };
    delete copy[excludedKey];
    return copy;
  }
}
