import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ApprovalLogComponent} from "./approval-log.component";

const routes: Routes = [
  { path: '', component: ApprovalLogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalLogRoutingModule { }
