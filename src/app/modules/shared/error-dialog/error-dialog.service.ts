import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiErrorType } from './error-dialog.models';

/**
 * Синглтон-состояние модального окна ошибки.
 * Интерсептор вызывает show(), глобальный компонент error-dialog подписан на state$.
 */
@Injectable({ providedIn: 'root' })
export class ErrorDialogService {
  private readonly stateSubject = new BehaviorSubject<ApiErrorType | null>(null);

  /** Текущий тип ошибки; null = окно закрыто */
  public readonly state$: Observable<ApiErrorType | null> = this.stateSubject.asObservable();

  public get isErrorOpen(): boolean {
    return this.stateSubject.value !== null;
  }

  /** Показать окно ошибки. Если окно уже открыто — игнорируем (не стакаем модалки при параллельных запросах) */
  public show(type: ApiErrorType): void {
    if (this.isErrorOpen) {
      return;
    }
    this.stateSubject.next(type);
  }

  /** Закрыть окно */
  public close(): void {
    this.stateSubject.next(null);
  }
}
