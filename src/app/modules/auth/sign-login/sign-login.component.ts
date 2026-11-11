import { AfterViewInit, Component, Input } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import {UserpassSharedService} from "../../../core/service/userpass.shared.service";
import {SignService} from "../../../core/service/sign.service";
import {AuthService} from "../../../core/service/auth.service";
import {NotificationSharedService} from "../../../core/service/notification.shared.service";

@Component({
  selector: 'app-sign-login',
  templateUrl: './sign-login.component.html',
  styleUrl: './sign-login.component.scss'
})
export class SignLoginComponent implements AfterViewInit {

    constructor(private userpassSharedService: UserpassSharedService,
                private signService: SignService, private messageService: MessageService,
                private authService: AuthService, private translateService: TranslateService,
                private router: Router, private notificationSharedService: NotificationSharedService) {}

    username!: string;
    password: string;
    oldPassword: string;
    newPassword: string;
    isLogin: boolean;
    isChangePass: boolean;
    iin: string;
    bin: string;
    fio: string = undefined;
    expiration: Date = undefined;
    ngAfterViewInit(): void {
        this.username = this.userpassSharedService.getUsername();
        this.password = this.userpassSharedService.getPassword();
        this.oldPassword = this.userpassSharedService.getOldPassword();
        this.newPassword = this.userpassSharedService.getNewPassword();
        this.isLogin = this.password != undefined && this.password != null;
        this.isChangePass = this.newPassword != undefined && this.newPassword != null;
        this.userpassSharedService.clear();
    }

    signToChangePass() {
        this.iin = this.bin = this.fio = this.expiration = undefined;
    }

    signToLogin() {
        this.iin = this.bin = this.fio = this.expiration = undefined;
        this.signService.signXml(null).subscribe(
            res => {
                console.log(res);
                const signedXml = res.result['responseObject'];
                if (this.isLogin) {
                    this.authService.login(this.username, this.password, signedXml).subscribe(
                        (res) => {
                            this.processResponse(res);
                        },
                        (err) => {
                            console.log(err);
                        }
                    )
                } else if (this.isChangePass) {
                    this.authService.changePassEds(this.username, this.oldPassword, this.newPassword, signedXml).subscribe(
                        (res) => {
                            this.processResponse(res);
                        },
                        (err) => {
                            console.log(err);
                            this.processResponse(err);
                        }
                    )
                }
            }
        )
    }

  processResponse(res: any) {
    console.log('processResponse:', res);

    const tokenResponse = res?.accessTokenResponse;
    const accessToken = tokenResponse?.access_token;
    const refreshToken = tokenResponse?.refresh_token;
    const redirectUrl = res?.redirectUrl;
    const exception = res?.exception
      ? res['exception']
      : (res?.error && res?.error?.errorCode)
        ? res['error']['errorCode']
        : undefined;

    const customData = res?.customData
      ? res['customData']
      : (res?.error && res?.error?.customData)
        ? res['error']['customData']
        : undefined;

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);

      this.authService.loadProfile().subscribe(() => {
        this.router.navigate(['/main']);

      });

      //console.log('refresh_token: ' + refreshToken )

      return;
    }

    if (customData) {
      this.iin = customData.iin;
      this.bin = customData.bin;
      this.fio = customData.fio;
      this.expiration = customData.certEndDate;
    }

    if (redirectUrl === '' || redirectUrl) {
      this.router.navigate(['/main']);
      return;
    }

    if (exception) {
      const detail =
        ('MAIN.AUTH.' + exception) === this.translateService.instant('MAIN.AUTH.' + exception)
          ? exception
          : this.translateService.instant('MAIN.AUTH.' + exception);

      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('COMMON.ERROR'),
        detail
      });
      return;
    }

    if (res['response'] === 'UPDATED_SUCCESSFULLY') {
      this.notificationSharedService.setMessage({
        severity: 'success',
        detail: this.translateService.instant('MAIN.AUTH.PASSWORD_UPDATED_SUCCESSFULLY')
      });
      this.router.navigate(['/auth/login']);
    }
  }


}
