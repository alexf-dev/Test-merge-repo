import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { RouterModule } from '@angular/router';
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {TranslateModule} from "@ngx-translate/core";
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    DropdownModule,
    PaginatorModule,
    TagModule,
    ButtonModule,
    ThemeToggleComponent,
    TranslateModule
  ]
})
export class MainPageModule { }
