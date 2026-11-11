import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CompletedWorkActsComponent} from "./completed-work-acts.component";
import {CompletedWorkActFormComponent} from "./completed-work-act-form/completed-work-act-form.component";
import {
    ExportCompletedExpertDealsComponent
} from "./export-completed-expert-deals/export-completed-expert-deals.component";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CardModule} from "primeng/card";
import {TranslateModule} from "@ngx-translate/core";
import {CalendarModule} from "primeng/calendar";
import {TranslateDictionaryPipe} from "../../core/pipe/translateDictionary.pipe";
import {CompletedWorkActsRoutingModule} from "./completed-work-acts-routing.module";
import {DialogModule} from "primeng/dialog";
import {RevisionReasonDialogComponent} from './revision-reason-dialog/revision-reason-dialog.component';
import {MessageModule} from "primeng/message";
import {ProgressBarModule} from "primeng/progressbar";


@NgModule({
    declarations: [CompletedWorkActsComponent, CompletedWorkActFormComponent, ExportCompletedExpertDealsComponent, RevisionReasonDialogComponent],
    imports: [
        CompletedWorkActsRoutingModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        ButtonDirective,
        TableModule,
        RouterLink,
        PaginatorModule,
        ConfirmDialogModule,
        CardModule,
        TranslateModule,
        CalendarModule,
        TranslateDictionaryPipe,
        DialogModule,
        MessageModule,
        ProgressBarModule
    ],
    providers: [TranslateDictionaryPipe]
})
export class CompletedWorkActsModule {
}
