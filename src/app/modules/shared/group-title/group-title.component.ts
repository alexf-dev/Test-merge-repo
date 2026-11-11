import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-group-title',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './group-title.component.html',
  styleUrls: ['./group-title.component.scss']
})
export class GroupTitleComponent {
  @Input() titleKey = '';
}
