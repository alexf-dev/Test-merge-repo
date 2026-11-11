import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePassRoutingModule } from './change-pass-routing.module';
import { ChangePassComponent } from './change-pass.component';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {TabViewModule} from "primeng/tabview";
import {TranslateModule} from "@ngx-translate/core";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import { CustomToastComponent } from "../../shared/custom-toast/custom-toast.component";

@NgModule({
    imports: [
        CommonModule,
        ChangePassRoutingModule,
        ButtonModule,
        CheckboxModule,
        DialogModule,
        InputTextModule,
        PaginatorModule,
        TabViewModule,
        TranslateModule,
        ToastModule,
        CustomToastComponent
    ],
    declarations: [ChangePassComponent],
    providers: [MessageService]
})
export class ChangePassModule { }
