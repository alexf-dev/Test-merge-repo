import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-text-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, InputTextModule],
  templateUrl: './text-input-field.component.html',
  styleUrls: ['./text-input-field.component.scss']
})
export class TextInputFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholderKey = 'MAIN.COMMON.ENTER_VALUE';

  /**
   * По макету текстовое поле, стоящее одно в строке, занимает всю ширину,
   * лейбл сверху. Дефолт true (как у textarea-field).
   * Если где-то нужна компактная раскладка "лейбл слева + поле 320px" —
   * передать явно [stacked]="false".
   */
  @Input() stacked = true;

  public inputId = 'text-input-field-' + ++TextInputFieldComponent.idCounter;

  public onValue(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
