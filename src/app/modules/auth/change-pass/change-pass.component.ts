import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import {NotificationSharedService} from "../../../core/service/notification.shared.service";
import {UserpassSharedService} from "../../../core/service/userpass.shared.service";
import {AuthService} from "../../../core/service/auth.service";

@Component({
    selector: 'app-change-pass',
    templateUrl: './change-pass.component.html',
    styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent {
    valCheck: string[] = ['remember'];

    username!: string;
    oldPassword!: string;
    newPassword!: string;
    newPassword2!: string;
    showOldPass: boolean;
    showNewPass: boolean;
    showNewPass2: boolean;
    isNewPassFocused: boolean;
    isNewPass2Focused: boolean;

    newPassRequirements = {
        loginNotSimilar: 0,
        passNotSimilar: 0,
        uppercase: 0,
        lowercase: 0,
        number: 0,
        specialChar: 0,
        minLength: 0,
        englishOnly: 0
    };

    constructor(private translateService: TranslateService
                , private authService: AuthService, private messageService: MessageService
                , private router: Router, private notificationSharedService: NotificationSharedService
                , private userpassSharedService: UserpassSharedService, private activatedRoute: ActivatedRoute
    ) {
        this.translateService.setDefaultLang('kk');
    }

    changePass() {
        this.authService.changePass(this.username, this.oldPassword, this.newPassword)
            .subscribe(
                (res) => {
                    console.log(res);
                    if (res['response'] === 'GO_TO_SIGN_PAGE') {
                        this.userpassSharedService.setLoginOldNewPasses(this.username, this.oldPassword, this.newPassword);
                        this.router.navigate(['sign'], { relativeTo: this.activatedRoute});
                    } else if (res['response'] === 'UPDATED_SUCCESSFULLY') {
                        this.notificationSharedService.setMessage({
                            severity: 'success',
                            detail: this.translateService.instant('MAIN.AUTH.PASSWORD_UPDATED_SUCCESSFULLY')
                        });
                        this.router.navigate(['/auth/login']);
                    }
                },
                (error) => {
                    if (error.error) {
                        const err = error.error;
                        console.log(err.errorCode);
                        const errorCode = err.errorCode;
                        const customData = err.customData;
                        const customParam = customData && customData.isParam ? this.copyObjectExcept(customData, 'isParam'): undefined;
                        let detail = ('MAIN.AUTH.' + errorCode) === this.translateService.instant('MAIN.AUTH.' + errorCode) ? errorCode
                            : this.translateService.instant('MAIN.AUTH.' + errorCode, customParam ? customParam : undefined);
                        this.messageService.add({
                            severity: 'error',
                            summary: this.translateService.instant('COMMON.ERROR'),
                            detail: detail
                        })
                    }
                }
            );
    }

    isNewPassOk() : boolean {
        if (!this.newPassword || this.newPassword.length == 0) {
            return false;
        }
        for (const key in this.newPassRequirements) {
            if (this.newPassRequirements.hasOwnProperty(key)) {
                if (this.newPassRequirements[key] != 1) {
                    return false;
                }
            }
        }
        return true;
    }

    isNewPass2Ok() : boolean {
        if (this.newPassword2 != this.newPassword) {
            return false;
        } else {
            return true;
        }
    }

    checkNewPassword() {
        if (!this.newPassword || this.newPassword.length == 0) {
            for (const key in this.newPassRequirements) {
                if (this.newPassRequirements.hasOwnProperty(key)) {
                    this.newPassRequirements[key] = 0;
                }
            }
        } else {
            this.newPassRequirements.loginNotSimilar = this.isNotSimilar(this.username, this.newPassword);
            this.newPassRequirements.passNotSimilar = this.isNotSimilar(this.oldPassword, this.newPassword);
            this.newPassRequirements.minLength = this.newPassword.length < 8 ? -1 : 1;
            this.newPassRequirements.lowercase = /[a-z]/.test(this.newPassword) ? 1 : -1;
            this.newPassRequirements.uppercase = /[A-Z]/.test(this.newPassword) ? 1 : -1;
            this.newPassRequirements.number = /[0-9]/.test(this.newPassword) ? 1 : -1;
            this.newPassRequirements.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.newPassword) ? 1 : -1;
            this.newPassRequirements.englishOnly = /[^!@#$%^&*(),.?":{}|<>a-zA-Z0-9]/.test(this.newPassword) ? -1 : 1;
        }
        if (!this.isNewPassOk()) {
            this.newPassword2 = undefined;
        }
    }

    isNotSimilar(str1, str2): number {
        let res = undefined
        if (!str1 || !str2 || str1.length == 0 || str2.length == 0) {
            res = 0;
        } else {
            let similarityPercentage = this.calculateSimilarity(str1, str2);
            res = similarityPercentage > 60? -1 : 1;
        }
        if (res === 1) {
            res = this.notIncludePart(str1, str2);
        }
        return res;
    }

    levenshteinDistance(a, b): number {
        const matrix = Array(a.length + 1)
            .fill(null)
            .map(() => Array(b.length + 1).fill(null));

        for (let i = 0; i <= a.length; i++) {
            matrix[i][0] = i;
        }
        for (let j = 0; j <= b.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const cost = a[i - 1] === b[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,       // deletion
                    matrix[i][j - 1] + 1,       // insertion
                    matrix[i - 1][j - 1] + cost // substitution
                );
            }
        }

        return matrix[a.length][b.length];
    }

    // Function to calculate similarity percentage
    calculateSimilarity(password1, password2): number {
        const maxLength = Math.max(password1.length, password2.length);
        const distance = this.levenshteinDistance(password1, password2);

        const similarity = ((maxLength - distance) / maxLength) * 100;
        return +similarity.toFixed(2);//Number(similarity.toFixed(2)); // Returns a percentage with two decimal places
    }

    notIncludePart(str1: string, str2: string): number {
        if (!str1 || !str2 || str1.length == 0 || str2.length == 0) {
            return 0;
        }
        let part1 = undefined;
        let part2 = undefined;
        if (str1.length > 4) {
            let half = (str1.length + 1) / 2;
            part1 = str1.substring(0, half).toLowerCase();
            part2 = str1.substring(half).toLowerCase();
        } else {
            part1 = str1.toLowerCase();
            part2 = part1;
        }
        let lower = str2.toLowerCase();
        if (lower.includes(part1) || lower.includes(part2)) {
            return -1;
        } else {
            return 1;
        }
    }

    copyObjectExcept(obj, excludeKey) {
        const { [excludeKey]: _, ...rest } = obj;
        return rest;
    }

    protected readonly Component = Component;
}
