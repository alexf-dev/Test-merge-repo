import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { ErrorDialogService } from '@shared/error-dialog/error-dialog.service';
import { resolveApiErrorType } from '@shared/error-dialog/error-dialog.models';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorDialogService: ErrorDialogService) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorType = resolveApiErrorType(error);

        if (errorType !== null) {
          this.errorDialogService.show(errorType);
        }

        return throwError(() => error);
      })
    );
  }
}
