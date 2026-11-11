import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-check-field',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, CheckboxModule, InputTextModule],
  templateUrl: './check-field.component.html',
  styleUrls: ['./check-field.component.scss']
})
export class CheckFieldComponent {
  private static idCounter = 0;

  @Input() labelKey = '';
  @Input() showComment = false;
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() comment = '';
  @Output() commentChange = new EventEmitter<string>();

  public inputId = 'check-field-' + ++CheckFieldComponent.idCounter;

  public onChecked(value: boolean): void {
    this.checked = value;
    this.checkedChange.emit(value);
  }

  public onComment(value: string): void {
    this.comment = value;
    this.commentChange.emit(value);
  }
}
