import { Component } from '@angular/core';
import { SharedModule } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-custom-toast',
  standalone: true,
    imports: [
        SharedModule,
        ToastModule,
        NgClass
    ],
  templateUrl: './custom-toast.component.html',
  styleUrl: './custom-toast.component.scss'
})
export class CustomToastComponent {}
