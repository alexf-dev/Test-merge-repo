import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';

import { ErrorDialogService } from './error-dialog.service';
import { API_ERROR_INFO, ApiErrorType } from './error-dialog.models';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit, OnDestroy {
  public visible = false;
  public titleKey = '';
  public messageKey = '';

  private subscription?: Subscription;

  constructor(private errorDialogService: ErrorDialogService) {}

  public ngOnInit(): void {
    this.subscription = this.errorDialogService.state$.subscribe((type) => {
      this.visible = type !== null;
      this.titleKey = type !== null ? API_ERROR_INFO[type].titleKey : '';
      this.messageKey = type !== null ? API_ERROR_INFO[type].messageKey : '';
    });
  }

  public onClose(): void {
    this.errorDialogService.close();
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
