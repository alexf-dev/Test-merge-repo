import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { OphSignedInJournalDTO } from '../../models/ophthalmological-data.models';

@Component({
  selector: 'app-oph-signed-in-journal',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent
  ],
  templateUrl: './signed-in-journal.component.html',
  styleUrls: ['./signed-in-journal.component.scss']
})
export class OphSignedInJournalComponent {
  @Input() public isExpanded = true;

  public model: OphSignedInJournalDTO = {
    independently: false,
    withHelp: false
  };

  public getData(): OphSignedInJournalDTO {
    return this.model;
  }

  public setData(data: OphSignedInJournalDTO): void {
    this.model = data;
  }
}
