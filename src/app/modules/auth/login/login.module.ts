import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from "@ngx-translate/core";
import { DialogModule } from "primeng/dialog";
import { TabViewModule } from "primeng/tabview";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {SignService} from "../../../core/service/sign.service";
import {CustomToastComponent} from "../../shared/custom-toast/custom-toast.component";

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        TranslateModule,
        DialogModule,
        TabViewModule,
        ToastModule,
        CustomToastComponent,
    ],
    declarations: [LoginComponent],
    providers: [MessageService, SignService]
})
export class LoginModule { }
