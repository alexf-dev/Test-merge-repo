import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {AuthComponent} from "./auth.component";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        CheckboxModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        SharedModule,
        TabViewModule,
        TranslateModule
    ],
    declarations: [AuthComponent]
})
export class AuthModule { }
