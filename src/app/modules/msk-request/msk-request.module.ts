import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MskRequestFormComponent} from "./msk-request-form/msk-request-form.component";
import {MskRequestRoutingMoudule} from "./msk-request-routing.moudule";
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [MskRequestFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MskRequestRoutingMoudule,
    ButtonModule,
    ProgressBarModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    InputTextModule,
    CardModule
  ],
  exports: [MskRequestFormComponent]
})
export class MskRequestModule {}
