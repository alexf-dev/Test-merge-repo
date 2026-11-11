import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

/** Пункт справочника: value храним в модели, labelKey переводим при отображении */
export interface DropdownOption {
  labelKey: string;
  value: string;
}

@Component({
  selector: 'app-dropdown-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, DropdownModule],
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent {
  @Input() labelKey = '';
  @Input() optionKeys: DropdownOption[] = [];
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string | null>();

  public onValue(value: string | null): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
