import { NgModule } from '@angular/core';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {MskRequestFormComponent} from "../msk-request/msk-request-form/msk-request-form.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    CalendarModule,
    DropdownModule,
    ToolbarModule,
    DividerModule
  ]
})
export class DashboardModule { }
