import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Button, ButtonDirective} from "primeng/button";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {OmkModule} from "../omk/omk.module";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {TooltipModule} from "primeng/tooltip";
import {TranslateDictionaryPipe} from "../../core/pipe/translateDictionary.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {ReestrIeExpertsRoutingModule} from "./reestr-ie-experts-routing.module";
import {TagModule} from "primeng/tag";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {BadgeModule} from "primeng/badge";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ReestrIeExpertsComponent} from "./reestr-ie-experts.component";
import {RadioButtonModule} from "primeng/radiobutton";



@NgModule({
  declarations: [ReestrIeExpertsComponent],
  imports: [
    CommonModule,
    ButtonDirective,
    CardModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    OmkModule,
    PrimeTemplate,
    TableModule,
    TooltipModule,
    TranslateDictionaryPipe,
    TranslateModule,
    ReestrIeExpertsRoutingModule,
    Button,
    TagModule,
    CalendarModule,
    CheckboxModule,
    BadgeModule,
    InputTextareaModule,
    ConfirmDialogModule,
    RadioButtonModule
  ]
})
export class ReestrIeExpertsModule { }
