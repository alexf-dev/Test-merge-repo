import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collapsible-block',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './collapsible-block.component.html',
  styleUrls: ['./collapsible-block.component.scss']
})
export class CollapsibleBlockComponent {
  @Input() titleKey = '';
  @Input() nested = false;
  @Input() isExpanded = true;

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
