import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG модули
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

// Модель
import { BloodTestDTO } from '../../models/laboratory-data.models';

/**
 * Конфигурация полей общего анализа крови
 * Используется в *ngFor для генерации полей
 */
const BLOOD_FIELDS_CONFIG = [
  { key: 'erythrocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ERYTHROCYTES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ERYTHROCYTES' },
  { key: 'hemoglobin', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HEMOGLOBIN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.HEMOGLOBIN' },
  { key: 'colorIndex', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.COLOR_INDEX', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.COLOR_INDEX' },
  { key: 'hematocrit', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HEMATOCRIT', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.HEMATOCRIT' },
  { key: 'platelets', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.PLATELETS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.PLATELETS' },
  { key: 'leukocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.LEUKOCYTES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.LEUKOCYTES' },
  { key: 'bandNuclear', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BAND_NUCLEAR', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BAND_NUCLEAR' },
  { key: 'segmentedNuclear', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SEGMENTED_NUCLEAR', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SEGMENTED_NUCLEAR' },
  { key: 'eosinophils', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.EOSINOPHILS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.EOSINOPHILS' },
  { key: 'basophils', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BASOPHILS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BASOPHILS' },
  { key: 'lymphocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.LYMPHOCYTES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.LYMPHOCYTES' },
  { key: 'monocytes', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.MONOCYTES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.MONOCYTES' },
  { key: 'esr', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ESR', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ESR', fullWidth: true }
];

/**
 * Моковые данные для демонстрации
 */
const MOCK_BLOOD_TEST: BloodTestDTO = {
  isNormal: false,
  erythrocytes: '',
  hemoglobin: '',
  colorIndex: '',
  hematocrit: '',
  platelets: '',
  leukocytes: '',
  bandNuclear: '',
  segmentedNuclear: '',
  eosinophils: '',
  basophils: '',
  lymphocytes: '',
  monocytes: '',
  esr: '',
  history: 'от 12.02.2018 г.: Hb — 136 г/л, Эритроциты — 4,40×10¹², Лейкоциты — 5,6×10⁹, Тромбоциты — 208 тыс., Лимфоциты — 41,4%, СОЭ — 6 мм/ч'
};

@Component({
  selector: 'app-blood-test',
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
  templateUrl: './blood-test.component.html',
  styleUrls: ['./blood-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BloodTestComponent implements OnInit {
  public form: FormGroup;
  public isExpanded = true;
  public isBloodTestNormal = false;

  /** Конфигурация полей для *ngFor */
  public bloodFields = BLOOD_FIELDS_CONFIG;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMockData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      erythrocytes: [''],
      hemoglobin: [''],
      colorIndex: [''],
      hematocrit: [''],
      platelets: [''],
      leukocytes: [''],
      bandNuclear: [''],
      segmentedNuclear: [''],
      eosinophils: [''],
      basophils: [''],
      lymphocytes: [''],
      monocytes: [''],
      esr: [''],
      history: ['']
    });
  }

  private loadMockData(): void {
    this.isBloodTestNormal = MOCK_BLOOD_TEST.isNormal;
    this.form.patchValue(MOCK_BLOOD_TEST);
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public onBloodTestNormalChange(checked: boolean): void {
    this.isBloodTestNormal = checked;
    if (checked) {
      // Очищаем все поля анализа крови
      this.form.patchValue({
        erythrocytes: '',
        hemoglobin: '',
        colorIndex: '',
        hematocrit: '',
        platelets: '',
        leukocytes: '',
        bandNuclear: '',
        segmentedNuclear: '',
        eosinophils: '',
        basophils: '',
        lymphocytes: '',
        monocytes: '',
        esr: ''
      });
    }
  }

  public getData(): BloodTestDTO {
    return {
      isNormal: this.isBloodTestNormal,
      ...this.form.value
    };
  }

  public setData(data: BloodTestDTO): void {
    this.isBloodTestNormal = data.isNormal;
    this.form.patchValue(data);
  }
}
