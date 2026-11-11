import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GbdflFindRoutingModule } from './gbdfl-find-routing.module';
import {GbdflFindComponent} from "./gbdfl-find.component";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {CardModule} from "primeng/card";


@NgModule({
  declarations: [GbdflFindComponent],
  imports: [
    CommonModule,
    FormsModule,
    GbdflFindRoutingModule,
    TableModule,
    TagModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ]
})
export class GbdflFindModule { }
