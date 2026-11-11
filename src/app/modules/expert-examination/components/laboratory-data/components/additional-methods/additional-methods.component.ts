import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// PrimeNG модули
import { InputTextareaModule } from 'primeng/inputtextarea';

// Модель
import { AdditionalMethodsDTO } from '../../models/laboratory-data.models';

/**
 * Моковые данные для демонстрации
 */
const MOCK_ADDITIONAL_METHODS: AdditionalMethodsDTO = {
  kag: `КАГ: Правый тип кровотока. Окклюзия ПЗ ПНА. Постокклюзионное русло ПНА контрастируется через внутри- и межсистемные коллатерали. Гемодинамически незначимые стенозы ОВ и ПКА 30%. Субокклюзия ЗМЖВ (диаметр артерии менее 2,0 мм). Тредмил тест от 10.01.2018 г.: Субмаксимальная ЧСС 129 уд/мин (72% от макс.) достигнута на 1 минуте 2 степени физической нагрузки. Субъективно: жалобы на выраженную одышку, умеренную давящую боль за грудиной.`,
  xray: 'ФЛГ от 05.02.2018 г.: без патологии.',
  ultrasound: '',
  abdominalUltrasound: '',
  heartUltrasound: `от 10.01.2018 г.: Состояние после ЧТКА со стентированием (от 04.04.2017 г.). Полости сердца не увеличены. МЖП неоднородно уплотнена. Зона гипокинеза (частичный гипокинез 15 сегмента). Аортальная околоклапанная регургитация. Створки МК уплотнены с митральной регургитацией околоклапанной 1 ст. Глобальная систолическая функция ЛЖ сохранена (ФВ — 60%). Диастолическая функция ЛЖ не нарушена. Не исключается откры...`,
  ecg: '',
  eeg: '',
  other: ''
};

@Component({
  selector: 'app-additional-methods',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    InputTextareaModule
  ],
  templateUrl: './additional-methods.component.html',
  styleUrls: ['./additional-methods.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdditionalMethodsComponent implements OnInit {
  public form: FormGroup;
  public isExpanded = true;

  public titleStyle = {
    'font-family': 'Inter, sans-serif',
    'font-weight': '700',
    'font-size': '14px',
    'line-height': '100%',
    'letter-spacing': '0%',
    'color': '#262626',
    'flex': '1'
  };

  // Стили для label полей (Medium, #020617)
  public labelStyle = {
    'font-family': 'Inter, sans-serif',
    'font-weight': '500',
    'font-size': '14px',
    'line-height': '20px',
    'letter-spacing': '0%',
    'color': '#020617',
    'display': 'block',
    'margin-bottom': '8px'
  };


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadMockData();
  }

  private initForm(): void {
    this.form = this.fb.group({
      kag: [''],
      xray: [''],
      ultrasound: [''],
      abdominalUltrasound: [''],
      heartUltrasound: [''],
      ecg: [''],
      eeg: [''],
      other: ['']
    });
  }

  private loadMockData(): void {
    this.form.patchValue(MOCK_ADDITIONAL_METHODS);
  }

  public toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  public getData(): AdditionalMethodsDTO {
    return this.form.value;
  }

  public setData(data: AdditionalMethodsDTO): void {
    this.form.patchValue(data);
  }
}
