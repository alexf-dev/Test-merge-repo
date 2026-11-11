import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";
import {AppealReexaminationComponent} from "./appeal-reexamination/appeal-reexamination.component";
import {OmkRoutingModule} from "./omk-routing.module";
import {OmkRequestFormComponent} from "./omk-request-form/omk-request-form.component";
import {DropdownModule} from "primeng/dropdown";
import {ChipModule} from "primeng/chip";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TranslateDictionaryPipe} from "../../core/pipe/translateDictionary.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {AppealJournalComponent} from "./appeal-journal/appeal-journal.component";
import {PaginatorModule} from "primeng/paginator";
import {TooltipModule} from "primeng/tooltip";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CommitteeRequestFormComponent} from "./committee-request-form/committee-request-form.component";
import {DialogModule} from "primeng/dialog";
import {PanelModule} from "primeng/panel";
import {DividerModule} from "primeng/divider";
import {ResolutionApprovedComponent} from "./resolution-approved/resolution-approved.component";



@NgModule({
  declarations: [AppealReexaminationComponent, OmkRequestFormComponent, AppealJournalComponent, CommitteeRequestFormComponent, ResolutionApprovedComponent],
  imports: [
    CommonModule,
    FormsModule,
    OmkRoutingModule,
    ButtonModule,
    ProgressBarModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    InputTextareaModule,
    TranslateDictionaryPipe,
    TranslateModule,
    CalendarModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ChipModule,
    TagModule,
    PaginatorModule,
    TooltipModule,
    ProgressSpinnerModule,
    DialogModule,
    PanelModule,
    DividerModule
  ],
  exports: [AppealReexaminationComponent, OmkRequestFormComponent, AppealJournalComponent, CommitteeRequestFormComponent]
})
export class OmkModule { }
