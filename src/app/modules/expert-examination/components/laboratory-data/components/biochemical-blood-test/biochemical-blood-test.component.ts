import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { BiochemicalBloodTestDTO } from '../../models/laboratory-data.models';

const BIOCHEMICAL_FIELDS_CONFIG = [
  { key: 'totalProtein', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.TOTAL_PROTEIN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.TOTAL_PROTEIN' },
  { key: 'albumin', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ALBUMIN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ALBUMIN' },
  { key: 'globulins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.GLOBULINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.GLOBULINS' },
  { key: 'fibrinogen', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.FIBRINOGEN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.FIBRINOGEN' },
  { key: 'pti', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.PTI', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.PTI' },
  { key: 'alpha1Globulins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ALPHA_1_GLOBULINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ALPHA_1_GLOBULINS' },
  { key: 'alpha2Globulins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ALPHA_2_GLOBULINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ALPHA_2_GLOBULINS' },
  { key: 'betaGlobulins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BETA_GLOBULINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BETA_GLOBULINS' },
  { key: 'gammaGlobulins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.GAMMA_GLOBULINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.GAMMA_GLOBULINS' },
  { key: 'thymolTest', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.THYMOL_TEST', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.THYMOL_TEST' },
  { key: 'sublimateTest', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SUBLIMATE_TEST', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SUBLIMATE_TEST' },
  { key: 'suremocoid', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SUREMOCOID', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SUREMOCOID' },
  { key: 'cReactiveProtein', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.C_REACTIVE_PROTEIN', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.C_REACTIVE_PROTEIN' },
  { key: 'creatinine', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.CREATININE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.CREATININE' },
  { key: 'urea', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.UREA', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.UREA' },
  { key: 'sugar', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.SUGAR', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.SUGAR' },
  { key: 'glucose', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.GLUCOSE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.GLUCOSE' },
  { key: 'bilirubinTotal', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BILIRUBIN_TOTAL', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BILIRUBIN_TOTAL' },
  { key: 'bilirubinDirect', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BILIRUBIN_DIRECT', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BILIRUBIN_DIRECT' },
  { key: 'bilirubinIndirect', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BILIRUBIN_INDIRECT', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BILIRUBIN_INDIRECT' },
  { key: 'alt', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ALT', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ALT' },
  { key: 'ast', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.AST', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.AST' },
  { key: 'alphaAmylase', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.ALPHA_AMYLASE', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.ALPHA_AMYLASE' },
  { key: 'totalCholesterol', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.TOTAL_CHOLESTEROL', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.TOTAL_CHOLESTEROL' },
  { key: 'betaLipoproteins', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.BETA_LIPOPROTEINS', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.BETA_LIPOPROTEINS' },
  { key: 'triglycerides', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.TRIGLYCERIDES', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.TRIGLYCERIDES' },
  { key: 'calciumSerum', labelKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.CALCIUM_SERUM', hintKey: 'MAIN.EXAMINATION.EXPERT_EXAMINATION.LABORATORY_DATA.HINT.CALCIUM_SERUM' }
];

const MOCK_BIOCHEMICAL_BLOOD_TEST: BiochemicalBloodTestDTO = {
  isNormal: false,
  totalProtein: '72',
  albumin: '60',
  globulins: '38',
  fibrinogen: '3',
  pti: '95',
  alpha1Globulins: '4.5',
  alpha2Globulins: '8.2',
  betaGlobulins: '9.5',
  gammaGlobulins: '15',
  thymolTest: '3',
  sublimateTest: '1.8',
  suremocoid: '0.15',
  cReactiveProtein: 'Отсутствует',
  creatinine: '85',
  urea: '4.5',
  sugar: '4.2',
  glucose: '4.1',
  bilirubinTotal: '12',
  bilirubinDirect: '3',
  bilirubinIndirect: '9',
  alt: '0.3',
  ast: '0.25',
  alphaAmylase: '20',
  totalCholesterol: '4.5',
  betaLipoproteins: '40',
  triglycerides: '1.8',
  calciumSerum: '2.5',
  history: 'от 15.02.2018 г.: Общий белок — 72 г/л, Креатинин — 85 мкмоль/л, Мочевина — 4,5 ммоль/л, Глюкоза — 4,2 ммоль/л, АЛТ — 0,3 ммоль/(ч*л), АСТ — 0,25 ммоль/(ч*л)'
};

@Component({
  selector: 'app-biochemical-blood-test',
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
  templateUrl: './biochemical-blood-test.component.html',
  styleUrls: ['./biochemical-blood-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BiochemicalBloodTestComponent implements OnInit {
  public form: FormGroup;
  public isExpanded = false;
  public isBiochemicalTestNormal = false;

  public biochemicalFields = BIOCHEMICAL_FIELDS_CONFIG;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMockData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      totalProtein: [''],
      albumin: [''],
      globulins: [''],
      fibrinogen: [''],
      pti: [''],
      alpha1Globulins: [''],
      alpha2Globulins: [''],
      betaGlobulins: [''],
      gammaGlobulins: [''],
      thymolTest: [''],
      sublimateTest: [''],
      suremocoid: [''],
      cReactiveProtein: [''],
      creatinine: [''],
      urea: [''],
      sugar: [''],
      glucose: [''],
      bilirubinTotal: [''],
      bilirubinDirect: [''],
      bilirubinIndirect: [''],
      alt: [''],
      ast: [''],
      alphaAmylase: [''],
      totalCholesterol: [''],
      betaLipoproteins: [''],
      triglycerides: [''],
      calciumSerum: [''],
      history: ['']
    });
  }

  private loadMockData(): void {
    this.isBiochemicalTestNormal = MOCK_BIOCHEMICAL_BLOOD_TEST.isNormal;
    this.form.patchValue(MOCK_BIOCHEMICAL_BLOOD_TEST);
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public onBiochemicalTestNormalChange(checked: boolean): void {
    this.isBiochemicalTestNormal = checked;
    if (checked) {
      const fieldsToReset = BIOCHEMICAL_FIELDS_CONFIG.map(f => f.key).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as any);
      this.form.patchValue(fieldsToReset);
    }
  }

  public getData(): BiochemicalBloodTestDTO {
    return {
      isNormal: this.isBiochemicalTestNormal,
      ...this.form.value
    };
  }

  public setData(data: BiochemicalBloodTestDTO): void {
    this.isBiochemicalTestNormal = data.isNormal;
    this.form.patchValue(data);
  }
}
