import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { CollapsibleBlockComponent } from '@shared/collapsible-block/collapsible-block.component';
import { CheckFieldComponent } from '@shared/check-field/check-field.component';
import { CheckCommentFieldComponent } from '@shared/check-comment-field/check-comment-field.component';
import { TextareaFieldComponent } from '@shared/textarea-field/textarea-field.component';
import { VegetativeTrophicSphereDTO } from '../../models/neurological-status.models';

@Component({
  selector: 'app-vegetative-trophic-sphere',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    CollapsibleBlockComponent,
    CheckFieldComponent,
    CheckCommentFieldComponent,
    TextareaFieldComponent
  ],
  templateUrl: './vegetative-trophic-sphere.component.html',
  styleUrls: ['./vegetative-trophic-sphere.component.scss']
})
export class VegetativeTrophicSphereComponent {
  @Input() public isExpanded = true;

  public model: VegetativeTrophicSphereDTO = {
    dermographism: { checked: false, value: '' },
    palmSoleHyperhidrosis: false,
    additionalInfo: ''
  };

  public getData(): VegetativeTrophicSphereDTO {
    return this.model;
  }

  public setData(data: VegetativeTrophicSphereDTO): void {
    this.model = data;
  }
}
