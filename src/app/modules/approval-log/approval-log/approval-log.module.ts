import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApprovalLogComponent} from "./approval-log.component";
import {ApprovalLogRoutingModule} from "./approval-log-routing.module";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {TranslateModule} from "@ngx-translate/core";
import {DialogModule} from "primeng/dialog";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {TranslateDictionaryPipe} from "../../../core/pipe/translateDictionary.pipe";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";




@NgModule({
  declarations: [ApprovalLogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ApprovalLogRoutingModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    CalendarModule,
    TranslateModule,
    DialogModule,
    ProgressSpinnerModule,
    InputTextModule,
    CardModule,
    TranslateDictionaryPipe,
    ConfirmDialogModule,
    TagModule,
    TooltipModule
  ]
})
export class ApprovalLogModule { }
