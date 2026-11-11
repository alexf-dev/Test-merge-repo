import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignLoginRoutingModule } from './sign-login-routing.module';
import { SignLoginComponent } from './sign-login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from "@ngx-translate/core";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import {SignService} from "../../../core/service/sign.service";
import {CustomToastComponent} from "../../shared/custom-toast/custom-toast.component";
import {RippleModule} from "primeng/ripple";

@NgModule({
  imports: [
    CommonModule,
    SignLoginRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    TranslateModule,
    ToastModule,
    CustomToastComponent,
    RippleModule,
  ],
    declarations: [SignLoginComponent],
    providers: [MessageService, SignService]
})
export class SignLoginModule { }
