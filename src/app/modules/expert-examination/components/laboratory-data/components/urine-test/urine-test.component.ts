import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { UrineTestDTO } from '../../models/laboratory-data.models';

const URINE_FIELDS_CONFIG = [
  { key: 'dailyVolume', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.DAILY_VOLUME', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.DAILY_VOLUME' },
  { key: 'specificGravity', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SPECIFIC_GRAVITY', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SPECIFIC_GRAVITY' },
  { key: 'color', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.COLOR', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.COLOR' },
  { key: 'transparency', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.TRANSPARENCY', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.TRANSPARENCY' },
  { key: 'ph', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.PH', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.PH' },
  { key: 'protein', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.PROTEIN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.PROTEIN' },
  { key: 'sugar', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SUGAR_URINE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SUGAR_URINE' },
  { key: 'acetone', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ACETONE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ACETONE' },
  { key: 'ketoneBodies', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.KETONE_BODIES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.KETONE_BODIES' },
  { key: 'urobilinBodies', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.UROBILIN_BODIES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.UROBILIN_BODIES' },
  { key: 'bilirubin', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BILIRUBIN_URINE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BILIRUBIN_URINE' },
  { key: 'ammonia', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.AMMONIA', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.AMMONIA' },
  { key: 'squamousEpitheliumCells', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SQUAMOUS_EPITHELIUM_CELLS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SQUAMOUS_EPITHELIUM_CELLS' },
  { key: 'transitionalEpitheliumCells', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.TRANSITIONAL_EPITHELIUM_CELLS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.TRANSITIONAL_EPITHELIUM_CELLS' },
  { key: 'renalEpitheliumCells', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.RENAL_EPITHELIUM_CELLS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.RENAL_EPITHELIUM_CELLS' },
  { key: 'leukocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.LEUKOCYTES_URINE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.LEUKOCYTES_URINE' },
  { key: 'erythrocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ERYTHROCYTES_URINE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ERYTHROCYTES_URINE' },
  { key: 'cylinders', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.CYLINDERS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.CYLINDERS' },
  { key: 'mucus', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.MUCUS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.MUCUS' },
  { key: 'bacteria', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BACTERIA', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BACTERIA' },
  { key: 'inorganicSediment', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.INORGANIC_SEDIMENT', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.INORGANIC_SEDIMENT' }
];

const MOCK_URINE_TEST: UrineTestDTO = {
  isNormal: false,
  dailyVolume: '1200',
  specificGravity: '1018',
  color: 'Соломенно-жёлтый',
  transparency: 'Прозрачная',
  ph: '6.0',
  protein: 'Отсутствует',
  sugar: 'Отсутствует',
  acetone: 'Отсутствует',
  ketoneBodies: 'Отсутствуют',
  urobilinBodies: 'Отсутствуют',
  bilirubin: 'Отсутствует',
  ammonia: 'Отсутствует',
  squamousEpitheliumCells: 'Единичные',
  transitionalEpitheliumCells: 'Единичные',
  renalEpitheliumCells: 'Единичные',
  leukocytes: '2',
  erythrocytes: '1',
  cylinders: 'Отсутствуют',
  mucus: 'Незначительное количество',
  bacteria: 'Отсутствуют',
  inorganicSediment: '',
  history: 'от 15.02.2018 г.: Количество — 1200 мл, Уд. вес — 1018, Цвет — соломенно-жёлтый, Прозрачность — прозрачная, pH — 6.0, Белок — отсутствует, Лейкоциты — 2 в п/зр, Эритроциты — 1 в п/зр'
};

@Component({
  selector: 'app-urine-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './urine-test.component.html',
  styleUrls: ['./urine-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UrineTestComponent implements OnInit {
  public form: FormGroup;
  public isExpanded = false;
  public isUrineTestNormal = false;

  public urineFields = URINE_FIELDS_CONFIG;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMockData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      dailyVolume: [''],
      specificGravity: [''],
      color: [''],
      transparency: [''],
      ph: [''],
      protein: [''],
      sugar: [''],
      acetone: [''],
      ketoneBodies: [''],
      urobilinBodies: [''],
      bilirubin: [''],
      ammonia: [''],
      squamousEpitheliumCells: [''],
      transitionalEpitheliumCells: [''],
      renalEpitheliumCells: [''],
      leukocytes: [''],
      erythrocytes: [''],
      cylinders: [''],
      mucus: [''],
      bacteria: [''],
      inorganicSediment: [''],
      history: ['']
    });
  }

  private loadMockData(): void {
    this.isUrineTestNormal = MOCK_URINE_TEST.isNormal;
    this.form.patchValue(MOCK_URINE_TEST);
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public onUrineTestNormalChange(checked: boolean): void {
    this.isUrineTestNormal = checked;
    if (checked) {
      const fieldsToReset = URINE_FIELDS_CONFIG.map(f => f.key).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as any);
      this.form.patchValue(fieldsToReset);
    }
  }

  public getData(): UrineTestDTO {
    return {
      isNormal: this.isUrineTestNormal,
      ...this.form.value
    };
  }

  public setData(data: UrineTestDTO): void {
    this.isUrineTestNormal = data.isNormal;
    this.form.patchValue(data);
  }
}
