import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';

import {DictionaryService} from '../../../core/service/dictionary.service';
import {DictionaryValue} from '../../../core/model/dictionary-value';
import {TranslateDictionaryPipe} from '../../../core/pipe/translateDictionary.pipe';
import {ActivatedRoute} from "@angular/router";
import {CamundaService} from "../../../core/service/camunda.service";
import {
  CirculationDysDto,
  ExpertOpinionRequest,
  MentalDysDto,
  SensorDysDto,
  StatoDysDto,
  UptDataDto
} from '../../../core/model/expertopinion-dto';
import {MessageService} from "primeng/api";
import {TranslationService} from "../../../core/service/translation.service";
import {Examination} from "../../../core/model/examination";
import {DropdownModule} from "primeng/dropdown";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CardModule} from "primeng/card";

/** ---------- Оценка состояния организма: типы/конфиг ---------- */
type OrgCtrlType = 'select' | 'textarea' | 'checkbox';
type OrgFieldCfg = { name: string; labelKey: string; type?: OrgCtrlType };
type OrgRowCfg = OrgFieldCfg[];
type OrgSectionCfg = {
  titleKey: string;
  fields?: OrgFieldCfg[];
  rows?: OrgRowCfg[];
  children?: OrgSectionCfg[];
  bottomTextarea?: { name: string; labelKey: string };
};

/** ---------- Дефекты: дерево для отображения ---------- */
interface DefectNode {
  item: DictionaryValue;
  children: DefectNode[];
}

interface DefDisplayNode {
  item: DictionaryValue;
  groups: DefDisplayNode[];
  leaves: DictionaryValue[];
}

/** ---------- Форма необратимых дефектов (типизировано) ---------- */
type IrrevControls = {
  mseJustification: FormControl<string | null>;
  expertiseEndDate: FormControl<Date | null>;
  disabilityCert: FormControl<string | null>;
  uotCert: FormControl<string | null>;
  // динамические чекбоксы-листья
  [k: string]: FormControl<any>;
};

type ConclusionFormModel = {
  groupId: FormControl<number | null>;
  temporaryDisabled: FormControl<boolean>;
  countedFrom: FormControl<Date | null>;
  termCode: FormControl<number | null>;
  termUntil: FormControl<Date | null>;
  reasonForm7Id: FormControl<number | null>;
  reasonText: FormControl<string | null>;
  uotDegreeId: FormControl<number | null>;
  uotTermCode: FormControl<number | null>;
  uotCountedTo: FormControl<Date | null>;
  uotCertificateDate: FormControl<Date | null>;
  reexaminationDate: FormControl<Date | null>;
};

export const uotByGroupValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const uCtrl = group.get('uotDegreeId');

  const gRaw = group.get('groupId')?.value;
  const uRaw = group.get('uotDegreeId')?.value;

  const g = gRaw === '' || gRaw == null ? null : Number(gRaw);
  const u = uRaw === '' || uRaw == null ? null : Number(uRaw);

  // если нет значений — убираем нашу ошибку и выходим
  if (g == null || u == null) {
    if (uCtrl?.errors?.['uotByGroup']) {
      const {uotByGroup, ...rest} = uCtrl.errors;
      uCtrl.setErrors(Object.keys(rest).length ? rest : null);
    }
    return null;
  }

  let ok = false;
  if (g === 766) ok = u >= 80 && u <= 100;
  else if (g === 767) ok = u >= 60 && u < 80;
  else if (g === 768) ok = u >= 0 && u < 60;

  if (!ok) {
    uCtrl?.setErrors({...(uCtrl.errors ?? {}), uotByGroup: true});
    return {uotByGroup: true}; // можно и null, но так видно ошибку на группе
  } else {
    if (uCtrl?.errors?.['uotByGroup']) {
      const {uotByGroup, ...rest} = uCtrl.errors;
      uCtrl.setErrors(Object.keys(rest).length ? rest : null);
    }
    return null;
  }
};

@Component({
  selector: 'app-expert-conclusion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    TranslateDictionaryPipe,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    InputTextareaModule,
    CardModule,
    FormsModule,
  ],
  templateUrl: './expert-conclusion.component.html',
  styleUrls: ['./expert-conclusion.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertConclusionComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private dictService: DictionaryService,
    private camundaService: CamundaService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translationService: TranslationService
  ) {
  }

  /** ---- словари ---- */
  dicIrrevDefs: DictionaryValue[] = [];
  displayRoots: DefDisplayNode[] = [];
  dicGoals: DictionaryValue[] = [];
  justificationOptions: DictionaryValue[] = [];
  nameClasses: DictionaryValue[] = [];
  mkbList: DictionaryValue[] = [];
  dicDisabilityGroups: DictionaryValue[] = [];
  dicDeadline: DictionaryValue[] = [];
  dicReasonsForm7: DictionaryValue[] = [];
  dicBriefJustification: DictionaryValue[] = [];
  dicLimitation: DictionaryValue[] = [];
  filteredLimitations: DictionaryValue[] = [];
  dicDefects: DictionaryValue[] = [];
  dicHelps: DictionaryValue[] = [];
  dicUotTerms: DictionaryValue[] = [];
  dicCauseUpt: DictionaryValue[] = [];
  dicNeedDynamicMonitoring: DictionaryValue[] = [];
  examination: Examination;

  private loadedDto?: ExpertOpinionRequest

  filteredDeadline: DictionaryValue[] = [];


  isLoadingClasses = false;
  isLoadingMkb = false;
  defsReady = false;
  isAdditionalInfoActive = false;

  isDirectionHas: boolean = false;
  isDirectionUotHas: boolean = false;
  isDirectionUptHas: boolean = false;
  isMedReabilatation: boolean = true;

  patientId: number | null = null;
  expertOpinionId: number | null = null;
  groupId: number | null = null;

  currentExpertId: number | null = null;

  pendingMkbId: number | null = null;


  directions = [801, 802, 803];
  directionsUot = [804, 805];
  directionsUpt = [806, 807]

  filteredDisabilityGroups: any[] = [];

  isSaving: boolean = false;

  /** ---- формы ---- */
  irreversibleForm: FormGroup<IrrevControls> = new FormGroup<IrrevControls>({
    mseJustification: new FormControl<string | null>(''),
    expertiseEndDate: new FormControl<Date | null>(null),
    disabilityCert: new FormControl<string | null>(''),
    uotCert: new FormControl<string | null>(''),
  });

  organForm = this.fb.group({});
  organOpen = signal<Record<string, boolean>>({});
  organCommonOptions: DictionaryValue[] = [];
  defOpen = signal<Record<number, boolean>>({});

  private readonly IRREV = {
    ROOT: 931,
    UPPER: 932,
    LOWER: 933,
    COMBINED: 934,
    STUMPS_UPPER: 935,
    STUMPS_LOWER_SPINE: 936,
    OTHER: 937,
    MENTAL_MODERATE: 947,
    MOTOR_SEVERE: 948,
  };

  private readonly DEADLINE_IDS = {
    Y5: 1075,
    Y2: 1074,
    Y1: 1073,
    M6: 1072,
    INDEFINITE: 1077
  };

  private readonly FIRST_GROUP_IDS = new Set([766, 769, 771]);
  private readonly SECOND_GROUP_IDS = new Set([767, 772]);
  private readonly THIRD_GROUP_IDS = new Set([768, 773]);

  private readonly DEADLINE_DEFECT_SET_A = new Set<number>([
    947, 948
  ]);

  private readonly DEADLINE_DEFECT_SET_B = new Set<number>([
    949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962
  ]);

  private readonly DEADLINE_DEFECT_SET_C = new Set<number>([
    963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993
  ]);

  private readonly DEADLINE_DEFECT_SET_D = new Set<number>([
    14657, 938, 939, 940, 941, 942, 943, 944, 945, 946
  ]);


  /** единый справочник для секции «Состояние» */
  private readonly organCommonDict = {id: 53, code: 'D_LEVEL_RATING'};

  /** ---------- конфиг секции «Состояние организма» ---------- */
  readonly organConfig: OrgSectionCfg[] = [
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SEVERITY',
      fields: [
        {
          name: 'severity',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SEVERITY',
          type: 'checkbox',
        },
      ],
    },
    // Психические функции
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.PSYCHIC',
      rows: [
        [
          {
            name: 'b156',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.PERCEPTION_b156',
            type: 'select'
          },
          {
            name: 'b140',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.ATTENTION_b140',
            type: 'select'
          },
          {name: 'b144', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MEMORY_b144', type: 'select'},
        ],
        [
          {name: 'b164', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.THINKING_b164', type: 'select'},
          {name: 'b167', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SPEECH_b167', type: 'select'},
          {name: 'b152', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.EMOTIONS_b152', type: 'select'},
        ],
        [
          {
            name: 'b130',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTIVATION_b130',
            type: 'select'
          },
          {
            name: 'b117',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.INTELLECT_b117',
            type: 'select'
          },
          {
            name: 'b110',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.CONSCIOUSNESS_b110',
            type: 'select'
          },
        ],
        [
          {name: 'b126', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.BEHAVIOR_b126', type: 'select'},
          {
            name: 'b147',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.PSYCHOMOTOR_b147',
            type: 'select'
          },
        ],
      ],
    },
    // Сенсорные функции
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SENSORY',
      rows: [
        [
          {name: 'b210', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.VISION_b210', type: 'select'},
          {name: 'b230', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.HEARING_b230', type: 'select'},
          {name: 'b255', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SMELL_b255', type: 'select'},
        ],
        [
          {name: 'b265', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.TOUCH_b265', type: 'select'},
          {
            name: 'b270',
            labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SENSITIVITY_b270',
            type: 'select'
          },
        ],
      ],
    },
    // Стадодинамика
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.TITLE',
      children: [
        {
          titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.HEAD',
          rows: [
            [
              {
                name: 'head',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.HEAD',
                type: 'select'
              },
              {
                name: 'b710_head',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.JOINT_MOBILITY_b710',
                type: 'select'
              },
              {
                name: 'b730_head',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.MUSCLE_POWER_b730',
                type: 'select'
              },
            ],
            [
              {
                name: 'b755_head',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.INVOLUNTARY_b755',
                type: 'select'
              },
              {
                name: 'b760_head',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.VOLUNTARY_b760',
                type: 'select'
              },
            ],
          ],
        },
        {
          titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.TRUNK',
          rows: [
            [
              {
                name: 'trunk',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.TRUNK',
                type: 'select'
              },
              {
                name: 'b710_trunk',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.JOINT_MOBILITY_b710',
                type: 'select'
              },
              {
                name: 'b730_trunk',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.MUSCLE_POWER_b730',
                type: 'select'
              },
            ],
            [
              {
                name: 'b755_trunk',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.INVOLUNTARY_b755',
                type: 'select'
              },
              {
                name: 'b760_trunk',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.VOLUNTARY_b760',
                type: 'select'
              },
            ],
          ],
        },
        {
          titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.LIMBS',
          rows: [
            [
              {
                name: 'limbs',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.LIMBS',
                type: 'select'
              },
              {
                name: 'b710_limbs',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.JOINT_MOBILITY_b710',
                type: 'select'
              },
              {
                name: 'b730_limbs',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.MUSCLE_POWER_b730',
                type: 'select'
              },
            ],
            [
              {
                name: 'b755_limbs',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.INVOLUNTARY_b755',
                type: 'select'
              },
              {
                name: 'b760_limbs',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.VOLUNTARY_b760',
                type: 'select'
              },
            ],
          ],
        },
        {
          titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.COORDINATION',
          rows: [
            [
              {
                name: 'coord_dynamic',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.COORD_DYNAMIC',
                type: 'select'
              },
              {
                name: 'b735_tone',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.MUSCLE_TONE_b735',
                type: 'select'
              },
              {
                name: 'b755_limbs2',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.INVOLUNTARY_b755',
                type: 'select'
              },
              {
                name: 'b760_coord',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.VOLUNTARY_b760',
                type: 'select'
              },
            ],
          ],
        },
        {
          titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.STANDING',
          rows: [
            [
              {
                name: 'standing',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.STANDING',
                type: 'select'
              },
              {
                name: 'standing_b710',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.JOINT_MOBILITY_b710',
                type: 'select'
              },
              {
                name: 'standing_b730',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.MUSCLE_POWER_b730',
                type: 'select'
              },
              {
                name: 'standing_b760',
                labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MOTOR.VOLUNTARY_b760',
                type: 'select'
              },
            ],
          ],
        },
      ],
    },
    // Структуры/опорно-двигательный (исправлены одинаковые name)
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCTURAL',
      rows: [
        [
          {name: 's710', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_b130', type: 'select'},
          {name: 's720', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_s760', type: 'select'},
          {name: 's730', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_s730', type: 'select'},
          {name: 's750', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_s750', type: 'select'},
          {name: 's720b', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_s720', type: 'select'},
          {name: 's740', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.STRUCT_s740', type: 'select'},
        ],
      ],
    },
    // Кровообращение
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.CIRCULATION',
      rows: [[
        {
          name: 'circulation',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.CIRCULATION',
          type: 'select'
        },
        {name: 'b410', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.HEART_b410', type: 'select'},
        {name: 'b415', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.BLOOD_b415', type: 'select'},
        {name: 'b420', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.BP_b420', type: 'select'},
        {name: 'b430', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.BS_b430', type: 'select'},
        {name: 'b440', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.RF_b440', type: 'select'},
      ]],
      bottomTextarea: {
        name: 'reason_circulation',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'
      },
    },
    // Дыхание
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.RESPIRATION',
      rows: [[{
        name: 'b440_resp',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.RESPIRATION_b440',
        type: 'select'
      }]],
      bottomTextarea: {
        name: 'reason_respiration',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'
      },
    },
    // Пищеварение
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.DIGESTION',
      rows: [[
        {name: 'b515', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.DIGEST_b515', type: 'select'},
        {name: 'b525', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.DIGEST_b525', type: 'select'},
      ]],
      bottomTextarea: {name: 'reason_digest', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'},
    },
    // Выделение
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.EXCRETION',
      rows: [[
        {name: 'excretion', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.EXCRETION1', type: 'select'},
        {
          name: 'b525_ex',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.EXCRETION_b525',
          type: 'select'
        },
        {name: 'b620', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.URINARY_b620', type: 'select'},
      ]],
      bottomTextarea: {
        name: 'reason_excretion',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'
      },
    },
    // Обмен веществ и энергия
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MET_ENERGY',
      rows: [[
        {name: 'energy', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MET_ENERGY1', type: 'select'},
        {
          name: 'b540',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MET_GENERAL_b540',
          type: 'select'
        },
        {name: 'b555', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.ENDOCRINE_b555', type: 'select'},
      ]],
      bottomTextarea: {name: 'reason_met', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'},
    },
    // Внутренняя секреция
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SECRETION',
      rows: [[
        {
          name: 'secretion',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.SECRETION_GENERAL',
          type: 'select'
        },
        {
          name: 'b540_1',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.MET_GENERAL_b540',
          type: 'select'
        },
        {
          name: 'b555_2',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.ENDOCRINE_b555',
          type: 'select'
        },
      ]],
      bottomTextarea: {
        name: 'reason_secretion',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'
      },
    },
    // Иммунитет
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.IMMUNITY',
      rows: [[
        {name: 'immunity', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.IMMUNITY', type: 'select'},
        {name: 'b435', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.IMMUNE_b435', type: 'select'},
        {
          name: 'b555_3',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.ENDOCRINE_b555',
          type: 'select'
        },
      ]],
      bottomTextarea: {name: 'reason_immunity', labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.REASON'},
    },
    // Прочее
    {
      titleKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.OTHER',
      rows: [[
        {
          name: 'other_fn',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.OTHER_FUNCTIONS',
          type: 'select'
        },
        {
          name: 'other_add',
          labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.OTHER_ADDITIONAL',
          type: 'select'
        },
      ]],
      bottomTextarea: {
        name: 'expert_justify',
        labelKey: 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.EXPERT_JUSTIFY'
      },
    },
  ];

  /** ----- мелкие формы ----- */
  formJustification = this.fb.group({goalsJustification: this.fb.group({})});
  formLimitation = this.fb.group({goalsLimitation: this.fb.group({})});
  formDefects = this.fb.group({goalsDefects: this.fb.group({})});
  formAddHelps = this.fb.group({goalsAddHelps: this.fb.group({})});
  form = this.fb.group({goals: this.fb.group({})});

  readonly diagnosisForm: FormGroup<{
    nameClasses: FormControl<number | null>;
    diseaseMkb: FormControl<number | null>;
    mainDiagnosis: FormControl<string>;
    comorbidId: FormControl<number | null>;
    complications: FormControl<string>;
    justification: FormControl<number | null>;
  }> = this.fb.group({
    nameClasses: this.fb.control<number | null>(null, {validators: [Validators.required]}),
    diseaseMkb: this.fb.control<number | null>(null, {validators: [Validators.required]}),
    mainDiagnosis: this.fb.control<string>('', {validators: [Validators.required, Validators.minLength(10)]}),
    comorbidId: this.fb.control<number | null>(null, {validators: [Validators.required]}),
    complications: this.fb.control<string>(''),
    justification: this.fb.control<number | null>(null, {validators: [Validators.required]}),
  });

  readonly recommendationForms = this.fb.group({
    medicalRehabilation: this.fb.control('', Validators.required),
    socialRehabilation: this.fb.control('', Validators.required),
    profRehabilation: this.fb.control('', Validators.required),
    socOrProdRecommendationCheckbox: this.fb.control<boolean | null>(false, Validators.requiredTrue),
    medRecommendationCheckbox: this.fb.control<boolean | null>({value: false, disabled: true}),
    needDynamicMonitoring: this.fb.control<number | null>(null, Validators.required),
    term: this.fb.control<Date | null>(null, Validators.required),
  });

  readonly conclusionForm = this.fb.group<ConclusionFormModel>({
    groupId: this.fb.control({value: null, disabled: true}),
    temporaryDisabled: this.fb.control({value: false, disabled: true}),
    countedFrom: this.fb.control({value: null, disabled: true}),
    termCode: this.fb.control({value: null, disabled: true}),
    termUntil: this.fb.control({value: null, disabled: true}),
    reasonForm7Id: this.fb.control({value: null, disabled: true}),
    reasonText: this.fb.control({value: null, disabled: true}),
    uotDegreeId: this.fb.control(
      {value: null, disabled: true},
      {validators: [Validators.required, Validators.min(0), Validators.max(100)]}
    ),
    uotTermCode: this.fb.control({value: null, disabled: true}),
    uotCountedTo: this.fb.control({value: null, disabled: true}),
    uotCertificateDate: this.fb.control({value: null, disabled: true}),
    reexaminationDate: this.fb.control({value: null, disabled: true}),
  }, {validators: [uotByGroupValidator]});


  readonly uptForm: FormGroup<{
    actNumber: FormControl<string>;
    companyName: FormControl<string>;
    bin: FormControl<string>;
    uotDegree: FormControl<number | null>;
    uotCountedFrom: FormControl<Date | null>;
    agreedWithDisabilityTerm: FormControl<boolean>;
    uptReasonId: FormControl<number | null>;
    uptTermCode: FormControl<number | null>;
    uotUntil: FormControl<Date | null>;
    uotCertificateRef: FormControl<string>;
    // Доп. виды помощи
    extraHelpEnabled: FormControl<boolean>;
    extraHelpNeedText: FormControl<string>;
    care: FormControl<boolean>;
    sanatorium: FormControl<boolean>;
    profTraining: FormControl<boolean>;
    retraining: FormControl<boolean>;
    assistive: FormControl<boolean>;
    mobility: FormControl<boolean>;
    specialTransport: FormControl<boolean>;
    employment: FormControl<boolean>;
    device1: FormControl<string>;
    device2: FormControl<string>;
    dvpConclusion: FormControl<string>;
  }> = this.fb.group({
    actNumber: this.fb.control<string>(''),
    companyName: this.fb.control<string>(''),
    bin: this.fb.control<string>(''),
    uotDegree: this.fb.control<number | null>(null, { /* при желании add: Validators.min(0), Validators.max(100) */}),
    uotCountedFrom: this.fb.control<Date | null>(null),
    agreedWithDisabilityTerm: this.fb.control<boolean>(false),
    uptReasonId: this.fb.control<number | null>(null),
    uptTermCode: this.fb.control<number | null>(null),
    uotUntil: this.fb.control<Date | null>(null),
    uotCertificateRef: this.fb.control<string>(''),
    // Доп. виды помощи
    extraHelpEnabled: this.fb.control<boolean>(false),
    extraHelpNeedText: this.fb.control<string>(''),
    care: this.fb.control<boolean>(false),
    sanatorium: this.fb.control<boolean>(false),
    profTraining: this.fb.control<boolean>(false),
    retraining: this.fb.control<boolean>(false),
    assistive: this.fb.control<boolean>(false),
    mobility: this.fb.control<boolean>(false),
    specialTransport: this.fb.control<boolean>(false),
    employment: this.fb.control<boolean>(false),
    device1: this.fb.control<string>(''),
    device2: this.fb.control<string>(''),
    dvpConclusion: this.fb.control<string>(''),
  });

  /** ---- навигация ---- */
  readonly subnav = [
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.GOAL',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONSULTATION',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.DIAGNOSIS.TITLE',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONDITION.TITLE',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.LIMITATIONS.TITLE',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.IRREVERSIBLE_DEFECTS',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.DEFECTS',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.CONCLUSION.TITLE',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.UPT.TITLE',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.JUSTIFICATION',
    'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.REHABILITATION.TITLE',
  ];
  readonly activeSub = signal<string>(this.subnav[0]);

  setSub(s: string) {
    this.activeSub.set(s);
  }

  get visibleSubnav(): string[] {
    return this.subnav.filter(
      s => s !== 'MAIN.EXAMINATION.EXPERT-CONCLUSION.SUBNAV.UPT.TITLE' || this.isDirectionUptHas
    );
  }

  get activeIndex(): number {
    return this.visibleSubnav.indexOf(this.activeSub());
  }

  nextStep(): void {
    const items = this.visibleSubnav;
    const currentIndex = items.indexOf(this.activeSub());

    if (currentIndex < items.length - 1) {
      this.setSub(items[currentIndex + 1]);
    }
  }

  prevStep(): void {
    const items = this.visibleSubnav;
    const currentIndex = items.indexOf(this.activeSub());

    if (currentIndex > 0) {
      this.setSub(items[currentIndex - 1]);
    }
  }


  get goalControlsJustification() {
    return (this.formJustification.controls.goalsJustification as any).controls;
  }

  get goalControlsLimitation() {
    return (this.formLimitation.controls.goalsLimitation as any).controls;
  }

  private getSelectedLimitationParIds(): number[] {
    const controls = this.goalControlsLimitation;

    const selectedIds = Object.keys(controls ?? {})
      .filter((key) => controls[key]?.value)
      .map(Number);

    return [...new Set(
      selectedIds
        .map(id => this.dicLimitation.find(x => Number(x.id) === id)?.parId)
        .filter((parId): parId is number => parId != null)
    )].sort((a, b) => a - b);
  }

  private getAllowedGroupIdsByLimitations(selectedIds: number[]): number[] {
    const key = [...selectedIds].sort((a, b) => a - b).join(',');

    const map: Record<string, number[]> = {
      '861': [768, 773],
      '861,862': [767, 772],
      '862': [767, 772],
      '861,862,863': [766, 769, 771, 774],
      '862,863': [766, 769, 771, 774],
      '863': [766, 769, 771, 774],
      '861,863': [766, 769, 771, 774],
    };

    return map[key] ?? [];
  }

  private getAllowedIrreversibleDefectIdsByLimitations(selectedIds: number[]): number[] {
    const key = [...selectedIds].sort((a, b) => a - b).join(',');

    const allMain = [
      this.IRREV.ROOT,
      this.IRREV.UPPER,
      this.IRREV.LOWER,
      this.IRREV.COMBINED,
      this.IRREV.STUMPS_UPPER,
      this.IRREV.STUMPS_LOWER_SPINE,
      this.IRREV.OTHER,
    ];

    const secondSet = [
      this.IRREV.MENTAL_MODERATE,
      this.IRREV.MOTOR_SEVERE,
      this.IRREV.UPPER,
      this.IRREV.LOWER,
      this.IRREV.COMBINED,
      this.IRREV.STUMPS_UPPER,
      this.IRREV.STUMPS_LOWER_SPINE,
      this.IRREV.OTHER,
    ];

    const firstOnlySet = [
      this.IRREV.STUMPS_UPPER,
      this.IRREV.STUMPS_LOWER_SPINE,
      this.IRREV.OTHER,
    ];

    const map: Record<string, number[]> = {
      '861,863': allMain,
      '861,862': allMain,
      '861,862,863': allMain,
      '861': allMain,

      '862,863': secondSet,
      '862': secondSet,

      '863': firstOnlySet,
    };

    return map[key] ?? [];
  }

  private applyIrreversibleDefectsByLimitations(): void {
    const selectedIds = this.getSelectedLimitationParIds();
    const rawAllowedIds = this.getAllowedIrreversibleDefectIdsByLimitations(selectedIds);

    const categoryIds = new Set(
      rawAllowedIds.filter(id => [931, 932, 933, 934, 935, 936, 937].includes(id)).map(String)
    );

    const directLeafIds = new Set(
      rawAllowedIds.filter(id => ![931, 932, 933, 934, 935, 936, 937].includes(id))
    );

    const leafIdsFromCategories = categoryIds.size
      ? this.collectLeafIdsByCategoryCodes(categoryIds)
      : new Set<number>();

    const allowedLeafIds = new Set<number>([
      ...directLeafIds,
      ...leafIdsFromCategories,
    ]);

    let changed = false;

    Object.keys(this.irreversibleForm.controls).forEach(key => {
      if (!key.startsWith('def_')) return;

      const ctrl = this.irreversibleForm.get(key) as FormControl<boolean>;
      const defectId = Number(key.slice(4));
      const shouldEnable = allowedLeafIds.has(defectId);

      if (shouldEnable && ctrl.disabled) {
        ctrl.enable({emitEvent: false});
        changed = true;
      }

      if (!shouldEnable && ctrl.enabled) {
        ctrl.setValue(false, {emitEvent: false});
        ctrl.disable({emitEvent: false});
        changed = true;
      }
    });

    if (changed) {
      this.cdr.markForCheck();
    }
  }

  private collectLeafIdsByCategoryCodes(allowCodes: Set<string>): Set<number> {
    const res = new Set<number>();
    const visit = (n: DefDisplayNode, allowedAncestor: boolean) => {
      const thisAllowed = allowedAncestor || (n.item?.id && allowCodes.has(String(n.item.id)));
      if (thisAllowed) {
        n.leaves.forEach(l => Number.isFinite(+l.id) && res.add(+l.id));
        n.groups.forEach(g => visit(g, true));
      } else {
        n.groups.forEach(g => visit(g, false));
      }
    };
    this.displayRoots.forEach(r => visit(r, false));
    return res;
  }

  private getSelectedIrreversibleDefectIds(): number[] {
    return Object.keys(this.irreversibleForm.controls)
      .filter(key => key.startsWith('def_') && !!this.irreversibleForm.get(key)?.value)
      .map(key => Number(key.slice(4)));
  }

  private getAllowedDeadlineIdsByGroupAndIrreversibleDefects(
    groupId: number | null,
    selectedDefectIds: number[]
  ): number[] {
    if (!selectedDefectIds.length) return [];


    const hasA = selectedDefectIds.some(id => this.DEADLINE_DEFECT_SET_A.has(id));
    const hasB = selectedDefectIds.some(id => this.DEADLINE_DEFECT_SET_B.has(id));
    const hasC = selectedDefectIds.some(id => this.DEADLINE_DEFECT_SET_C.has(id));
    const hasD = selectedDefectIds.some(id => this.DEADLINE_DEFECT_SET_D.has(id));

    if (this.FIRST_GROUP_IDS.has(groupId)) {
      if (hasA && !hasB && !hasC && !hasD) {
        return [
          this.DEADLINE_IDS.Y5,
          this.DEADLINE_IDS.Y2,
          this.DEADLINE_IDS.Y1,
          this.DEADLINE_IDS.M6,
        ];
      }

      if ((hasB || hasC) && !hasD) {
        return [
          this.DEADLINE_IDS.Y5,
          this.DEADLINE_IDS.Y2,
          this.DEADLINE_IDS.Y1,
          this.DEADLINE_IDS.M6,
          this.DEADLINE_IDS.INDEFINITE,
        ];
      }
    }

    if (this.SECOND_GROUP_IDS.has(groupId)) {
      if (hasC) {
        return [
          this.DEADLINE_IDS.Y5,
          this.DEADLINE_IDS.Y2,
          this.DEADLINE_IDS.Y1,
          this.DEADLINE_IDS.M6,
          this.DEADLINE_IDS.INDEFINITE
        ];
      }

      if (hasA || hasB) {
        return [
          this.DEADLINE_IDS.INDEFINITE
        ];
      }
    }

    if (this.THIRD_GROUP_IDS.has(groupId)) {
      if (hasC) {
        return [this.DEADLINE_IDS.INDEFINITE];
      }
    }

    return [this.DEADLINE_IDS.INDEFINITE];
  }

  private updateDeadlineByIrreversibleDefectsAndGroup(): void {
    const selectedDefectIds = this.getSelectedIrreversibleDefectIds();
    const groupId = this.conclusionForm.get('groupId')?.value ?? null;

    const allowedDeadlineIds = this.getAllowedDeadlineIdsByGroupAndIrreversibleDefects(
      Number(groupId),
      selectedDefectIds
    );

    this.filteredDeadline = (this.dicDeadline ?? []).filter((item: any) =>
      allowedDeadlineIds.includes(Number(item.id))
    );

    const termCodeControl = this.conclusionForm.get('termCode');
    const currentTerm = termCodeControl?.value ?? null;

    if (currentTerm && !allowedDeadlineIds.includes(Number(currentTerm))) {
      termCodeControl?.setValue(null, {emitEvent: false});
    }

    // if (!currentTerm && allowedDeadlineIds.length === 1) {
    //   termCodeControl?.setValue(allowedDeadlineIds[0], { emitEvent: true });
    // }

    this.cdr.markForCheck();
  }


  private updateFilteredDisabilityGroups(): void {
    const selectedIds = this.getSelectedLimitationParIds();
    const allowedGroupIds = this.getAllowedGroupIdsByLimitations(selectedIds);

    this.filteredDisabilityGroups = (this.dicDisabilityGroups ?? []).filter((item: any) =>
      allowedGroupIds.includes(Number(item.id))
    );

    const groupIdControl = this.conclusionForm.get('groupId');

    if (!allowedGroupIds.length) {
      groupIdControl?.setValue(null, {emitEvent: false});
    }

    this.cdr.markForCheck();
  }

  private recalcDerivedState(): void {
    this.updateFilteredDisabilityGroups();
    this.applyIrreversibleDefectsByLimitations();
    this.updateDeadlineByIrreversibleDefectsAndGroup();
    this.cdr.markForCheck();
  }


  get goalControlsDefects() {
    return (this.formDefects.controls.goalsDefects as any).controls;
  }

  get goalAddHelps() {
    return (this.formAddHelps.controls.goalsAddHelps as any).controls;
  }

  get isIndefiniteTerm(): boolean {
    const term = this.conclusionForm.get('termCode')?.value as number | null;
    return term === this.INDEF_TERM; // INDEF_TERM = 6
  }


  private readonly grpDisability = ['groupId', 'temporaryDisabled', 'countedFrom', 'termCode', 'termUntil', 'reasonForm7Id'];
  private readonly grpUot = ['reasonText', 'uotDegreeId', 'uotTermCode', 'uotCountedTo', 'uotCertificateDate', 'reexaminationDate'];


  private toggle(names: string[], enabled: boolean): void {
    names.forEach(n => this.conclusionForm.get(n)?.[enabled ? 'enable' : 'disable']({emitEvent: false}));

  }


  onToggleDefects(id: string) {
    const c = this.goalControlsDefects;

    const onlyOne = (g: string[]) => {
      if (c[id].value && g.includes(id)) {
        g.filter(x => x !== id).forEach(x =>
          c[x].setValue(false, {emitEvent: false})
        );
      }
    };
    onlyOne(['897', '898']);
    onlyOne(['909', '910']);
    onlyOne(['911', '912']);
    onlyOne(['926', '927']);

    const enableNonBaseline = () => {
      Object.keys(c).forEach(k => {
        if (c[k].disabled && !this.baselineDisabledDefects.has(k)) {
          c[k].enable({emitEvent: false});
        }
      });
    };

    /** --- логика для 929 (бывш. 923) --- */
    if (id === '929') {
      if (c['929'].value) {
        // выбрали 929 → сбросить и отключить всех остальных
        Object.keys(c).forEach(k => {
          if (k !== '929') {
            c[k].setValue(false, {emitEvent: false});
            c[k].disable({emitEvent: false});
          }
        });
      } else {
        // сняли 929 → включить только не базовые
        enableNonBaseline();
      }
    } else {
      // выбрали что-то другое → снять 929, и убедиться что не-базовые доступны
      if (c['929']?.value) c['929'].setValue(false, {emitEvent: false});
      if (c['929']?.disabled) enableNonBaseline();
    }

    /** --- логика для 930 (бывш. 924) --- */
    this.isAdditionalInfoActive = !!c['930']?.value;
  }


  get uotMin(): number {
    const g = this.conclusionForm.get('groupId')?.value as number | null;
    if (g === 766) return 80;  // группа 1
    if (g === 767) return 60;  // группа 2
    if (g === 768) return 0;   // группа 3
    return 0;                  // не выбрано
  }

  get uotMax(): number {
    const g = this.conclusionForm.get('groupId')?.value as number | null;
    if (g === 766) return 100; // группа 1
    if (g === 767) return 79;  // группа 2 (строго <80)
    if (g === 768) return 59;  // группа 3 (строго <60)
    return 100;                // не выбрано
  }

  /** ======================= INIT ======================= */
  ngOnInit(): void {

    this.uptForm.get('uptTermCode')!.valueChanges.subscribe((termId: number | null) => {
      const until = this.calcUptUntil(termId);
      this.uptForm.get('uotUntil')!.setValue(until, {emitEvent: false});
      this.cdr.markForCheck();
    });


    this.conclusionForm.get('groupId')?.valueChanges.subscribe((groupId: number | null) => {
      this.updateCheckboxesByGroup(groupId);
      this.conclusionForm.get('uotDegreeId')?.updateValueAndValidity({onlySelf: true});
      this.conclusionForm.updateValueAndValidity({onlySelf: true, emitEvent: false});

      this.updateDeadlineByIrreversibleDefectsAndGroup();

      this.cdr.markForCheck();
    });

    // при вводе процента — тоже пересчитать
    this.conclusionForm.get('uotDegreeId')?.valueChanges.subscribe(() => {
      this.conclusionForm.updateValueAndValidity();
      this.cdr.markForCheck();
    });
    const raw = this.route.snapshot.paramMap.get('patientId');
    const raw2 = this.route.snapshot.paramMap.get('expertOpinionId');
    this.patientId = raw !== null && !Number.isNaN(Number(raw)) ? Number(raw) : null;
    this.expertOpinionId = raw2 !== null && !Number.isNaN(Number(raw2)) ? Number(raw2) : null;
    console.log(this.expertOpinionId);

    this.loadExisting();

    this.loadLimitations();

    this.loadDict(15, 'D_Z_DIRECTION', d => {
      this.dicGoals = d;
      this.form.setControl('goals', this.buildCheckboxGroup(this.dicGoals));
      this.cdr.markForCheck();
    });

    this.loadDict(20, 'DIC_BRIEF_JUSTIFICATION', d => {
      this.dicBriefJustification = d;
      this.formJustification.setControl('goalsJustification', this.buildCheckboxGroup2(d));
      this.tryPatchFromDto();
      this.cdr.markForCheck();


      // сразу применим текущее значение, если уже есть
      const currentGroupId = this.conclusionForm.get('groupId')?.value as number | null;
      this.updateCheckboxesByGroup(currentGroupId);

      this.cdr.markForCheck();
    });

    this.loadDict(21, 'DIC_DEFECTS', d => {
      this.dicDefects = d;
      this.formDefects.setControl('goalsDefects', this.buildCheckboxGroupDefects(d));
      this.tryPatchFromDto();
      this.cdr.markForCheck();


    });
    this.loadDict(104, 'D_ADD_HELP', d => {
      this.dicHelps = d;
      this.formAddHelps.setControl('goalsAddHelps', this.buildCheckboxGroup(d));
      this.tryPatchFromDto();
      this.cdr.markForCheck();


    });

    // простые справочники
    this.loadDict(12, 'D_DIRECTIONMSE', d => (this.justificationOptions = d));
    this.loadDisability(13, this.patientId, d => {
      this.dicDisabilityGroups = d ?? [];
      this.conclusionForm.get('groupId')?.enable({emitEvent: false});
      this.updateFilteredDisabilityGroups();
    });
    this.loadDisability(26, this.patientId, d => (this.dicDeadline = d));
    this.loadDisability(14, this.patientId, d => (this.dicReasonsForm7 = d));
    this.loadDict(17, 'D_DEADLINE2', d => (this.dicUotTerms = d));
    this.loadDict(35, 'D_DYNAMICOBSERVATION', d => (this.dicNeedDynamicMonitoring = d));
    this.loadDict(29, 'D_CAUSE_UPT', d => (this.dicCauseUpt = d));


    // дефекты

    this.loadDict(22, 'DIC_ANATOM_DEFECTS', list => {
      this.dicIrrevDefs = list;
      this.displayRoots = this.buildDisplayTree(list);
      this.addLeafControlsFromDisplay(this.displayRoots);

      this.defsReady = true;

      this.tryPatchFromDto();
      this.updateDeadlineByIrreversibleDefectsAndGroup();

      this.cdr.markForCheck();
    });

    // органы
    this.addOrganControls(this.organConfig);
    this.dictService.load(this.organCommonDict.id, this.organCommonDict.code).subscribe(list => {
      this.organCommonOptions = list ?? [];
      const open: Record<string, boolean> = {};
      this.walkSection(this.organConfig, (_s, p) => (open[p] = true));
      this.organOpen.set(open);
      this.tryPatchFromDto();
      this.cdr.markForCheck();
    });

    // МКБ
    this.fetchNameClasses();
    this.diagnosisForm.get('nameClasses')!.valueChanges.subscribe(classId => {
      this.diagnosisForm.patchValue({diseaseMkb: null}, {emitEvent: false});
      this.mkbList = [];
      if (classId) this.fetchMkb(+classId);
    });

    this.camundaService.getExaminationByPatientId(this.patientId).subscribe(
      list => {
        this.examination = list;
      });

    // this.updateFilteredDisabilityGroups();
    //
    // (this.formLimitation.get('goalsLimitation') as FormGroup)?.valueChanges.subscribe(() => {
    //   this.updateFilteredDisabilityGroups();
    // });


  }

  onLimitationChange(): void {
    this.recalcDerivedState();
  }

  onIrreversibleDefectChange(): void {
    this.updateDeadlineByIrreversibleDefectsAndGroup();
    this.cdr.markForCheck();
  }

  onGroupChange(groupId: number | null): void {
    this.updateCheckboxesByGroup(groupId);
    this.conclusionForm.get('uotDegreeId')?.updateValueAndValidity({onlySelf: true});
    this.conclusionForm.updateValueAndValidity({onlySelf: true, emitEvent: false});
    this.updateDeadlineByIrreversibleDefectsAndGroup();
    this.cdr.markForCheck();
  }

  private calcUptUntil(termId: number | null): Date | null {
    if (!termId) return null;

    const d = new Date(this.examination.beginDate) // сегодня


    switch (termId) {
      case 820: // 6 месяцев
        d.setMonth(d.getMonth() - 6);
        return d;

      case 821: // 1 год
        d.setFullYear(d.getFullYear() - 1);
        return d;

      case 822: // 2 года
        d.setFullYear(d.getFullYear() - 2);
        return d;

      case 827: // 5 лет
        d.setFullYear(d.getFullYear() - 5);
        return d;

      case 823:
        return null;

      case 824:
        return null;

      default:
        return null;
    }
  }


  /** ======================= УТИЛИТЫ ======================= */

  private loadDict(id: number, code: string, assign: (d: DictionaryValue[]) => void) {
    this.dictService.load(id, code).subscribe(d => assign(d ?? []));
  }

  private loadDisability(code: number, patientId: number, assign: (d: DictionaryValue[]) => void) {
    this.dictService.loadDisability(code, patientId).subscribe(d => assign(d ?? []));
  }

  private loadDictWithCodeAndGroupId(id: number, code: string, groupId: number, assign: (d: DictionaryValue[]) => void) {
    this.dictService.loadDictWithCodeAndGroupId(id, code, groupId).subscribe(d => assign(d ?? []));
  }

  private buildCheckboxGroup(list: DictionaryValue[]) {
    const g: Record<string, FormControl<boolean>> = {};
    list.forEach(x => (g[String(x.id)] = new FormControl<boolean>(false)));
    return this.fb.group(g);
  }

  private buildCheckboxGroup2(list: DictionaryValue[]) {
    const g: Record<string, FormControl<boolean>> = {};
    list.forEach(x => {
      g[String(x.id)] = new FormControl<boolean>({value: false, disabled: false});
    });
    return this.fb.group(g);
  }

  private baselineDisabledDefects = new Set<string>();

  private buildCheckboxGroupDefects(list: DictionaryValue[]) {
    const g: Record<string, FormControl<boolean>> = {};
    this.baselineDisabledDefects = new Set(); // сброс

    list.forEach(x => {
      const code = String(x.id);
      const disabled = this.DISABLED_DEFECT_CODES.has(code);
      if (disabled) this.baselineDisabledDefects.add(code);
      g[code] = new FormControl<boolean>({value: false, disabled});
    });

    return this.fb.group(g);
  }

  private updateCheckboxesByGroup(groupId: number | null) {
    const grp = this.formJustification.get('goalsJustification') as FormGroup;
    if (!grp) return;

    const toDisable = this.disableRules.get(groupId ?? -1) ?? new Set<string>();

    for (const code of Object.keys(grp.controls)) {
      const ctrl = grp.get(code) as FormControl<boolean>;
      const codeStr = String(code);
      const mustBeDisabled = toDisable.has(codeStr);

      if (mustBeDisabled) {
        if (ctrl.enabled) {
          ctrl.setValue(false, {emitEvent: false});
          ctrl.disable({emitEvent: false});
        }
      } else {
        if (ctrl.disabled) {
          ctrl.enable({emitEvent: false});
        }
      }
    }

    this.cdr.markForCheck();
  }

  // private updateCheckboxesByGroup2(groupId: number | null) {
  //   const grp = this.formLimitation.get('goalsLimitation') as FormGroup;
  //   if (!grp) return;
  //
  //   const toDisable = this.disableLimitationRules.get(groupId ?? -1) ?? new Set<string>();
  //
  //   // пробегаемся по контролам; меняем состояние только при необходимости
  //   for (const code of Object.keys(grp.controls)) {
  //     const ctrl = grp.get(code) as FormControl<boolean>;
  //     const codeStr = String(code);
  //     const mustBeDisabled = toDisable.has(codeStr);
  //
  //     if (mustBeDisabled) {
  //       // если включен — снимем галку и отключим
  //       if (ctrl.enabled) {
  //         ctrl.setValue(false, { emitEvent: false });
  //         ctrl.disable({ emitEvent: false });
  //       }
  //     } else {
  //       // если должен быть включен — включим
  //       if (ctrl.disabled) {
  //         ctrl.enable({ emitEvent: false });
  //       }
  //     }
  //   }
  //
  //   this.cdr.markForCheck();
  // }

  private loadLimitations(): void {
    this.loadDict(19, 'DIC_LIMITATION', d => {
      this.dicLimitation = d ?? [];

      this.updateFilteredLimitations();

      const limitationGroup = this.buildCheckboxGroup(this.dicLimitation);
      this.formLimitation.setControl('goalsLimitation', limitationGroup);

      this.tryPatchFromDto();
      this.updateFilteredDisabilityGroups();
      this.cdr.markForCheck();
    });
  }

  private updateFilteredLimitations(): void {
    const hiddenId = [861, 862, 863];

    this.filteredLimitations = (this.dicLimitation ?? []).filter(item =>
      !hiddenId.includes(Number(item.id))
    );
  }


  private readonly DISABLED_DEFECT_CODES = new Set<string>(['908', '919', '920', '922', '923', '925']);

  private readonly disableRules = new Map<number, Set<string>>([
    [766, new Set(['894', '896'])],
    [771, new Set(['894', '896'])],
    [767, new Set(['892', '896'])],
    [772, new Set(['892', '896'])],
    [768, new Set(['892', '894'])],
    [773, new Set(['892', '894'])],
  ]);


  private readonly INDEF_TERM = 1076;


  private fetchNameClasses() {
    this.isLoadingClasses = true;
    this.dictService.loadNameClasses().subscribe({
      next: d => (this.nameClasses = d ?? []),
      error: e => console.error('Ошибка nameClasses', e),
      complete: () => (this.isLoadingClasses = false),
    });
  }

  private fetchMkb(classId: number) {
    this.isLoadingMkb = true;
    this.dictService.loadMkbByClass(classId).subscribe({
      next: d => {
        this.mkbList = d ?? [];
        if (this.pendingMkbId != null) {
          const exists = this.mkbList.some(x => x.id === this.pendingMkbId);
          if (exists) {
            this.diagnosisForm.patchValue({diseaseMkb: this.pendingMkbId}, {emitEvent: false});
          }
          this.pendingMkbId = null;
        }
      },
      error: e => console.error('Ошибка mkbList', e),
      complete: () => {
        this.isLoadingMkb = false;
        this.cdr.markForCheck();
      },
    });
  }

  /** органы — добавление контролов по конфигу */
  private addOrganControls(cfg: OrgSectionCfg[]) {
    const getDefaultValue = (f: OrgFieldCfg) => {
      if (f.type === 'checkbox') return false;
      if (f.type === 'select') return 0;
      return '';
    };

    const add = (sections: OrgSectionCfg[]) => sections.forEach(s => {
      s.fields?.forEach(f =>
        this.organForm.addControl(f.name, new FormControl(getDefaultValue(f)))
      );

      s.rows?.forEach(r => r.forEach(f =>
        this.organForm.addControl(f.name, new FormControl(getDefaultValue(f)))
      ));

      if (s.bottomTextarea) {
        this.organForm.addControl(s.bottomTextarea.name, new FormControl(''));
      }

      if (s.children?.length) add(s.children);
    });

    add(cfg);
  }

  /** пройти секции (для открытия/сборки путей) */
  private walkSection(
    sections: OrgSectionCfg[],
    onSection: (s: OrgSectionCfg, path: string) => void,
    path: string[] = [],
  ) {
    sections.forEach((s, i) => {
      const p = [...path, `${s.titleKey}#${i}`].join('/');
      onSection(s, p);
      if (s.children?.length) this.walkSection(s.children, onSection, [...path, `${s.titleKey}#${i}`]);
    });
  }

  sectionPath(stack: OrgSectionCfg[], ...idx: number[]) {
    return stack.map((s, i) => `${s.titleKey}#${idx[i] ?? 0}`).join('/');
  }

  toggleOrgan(path: string) {
    const curr = {...this.organOpen()};
    curr[path] = !curr[path];
    this.organOpen.set(curr);
  }

  /** дерево дефектов -> display */
  private buildDisplayTree(src: DictionaryValue[]): DefDisplayNode[] {
    const map = new Map<number, DefectNode>();
    src.forEach(d => map.set(d.id, {item: d, children: []}));
    src.forEach(d => {
      const p = Number.isFinite(d.parId) ? d.parId : 0;
      if (p && map.has(p)) map.get(p)!.children.push(map.get(d.id)!);
    });

    const childIds = new Set<number>();
    map.forEach(n => n.children.forEach(c => childIds.add(c.item.id)));
    const roots = [...map.values()].filter(n => !childIds.has(n.item.id));

    const normalize = (n: DefectNode): DefDisplayNode => {
      while (n.children.length === 1 && n.children[0].children.length > 0) n = n.children[0];
      const groups: DefDisplayNode[] = [];
      const leaves: DictionaryValue[] = [];
      n.children.forEach(c => (c.children.length ? groups.push(normalize(c)) : leaves.push(c.item)));
      leaves.sort((a, b) => (a.code || '').localeCompare(b.code || ''));
      groups.sort((a, b) => (a.item.code || '').localeCompare(b.item.code || ''));
      return {item: n.item, groups, leaves};
    };

    const display = roots.map(normalize);

    // открыть всё
    const open: Record<number, boolean> = {};
    const mark = (d: DefDisplayNode) => {
      open[d.item.id] = true;
      d.groups.forEach(mark);
    };
    display.forEach(mark);
    this.defOpen.set(open);

    return display;
  }

  /** добавить FormControl только на листья */
  private addLeafControlsFromDisplay(nodes: DefDisplayNode[]) {
    const add = (n: DefDisplayNode) => {
      n.leaves.forEach(l => {
        const key = this.leafKey(l.id);
        if (!this.irreversibleForm.contains(key)) {
          this.irreversibleForm.addControl(key, new FormControl<boolean>(false));
        }
      });
      n.groups.forEach(add);
    };
    nodes.forEach(add);
  }

  private loadExisting(): void {
    if (this.patientId == null) return;

    this.camundaService.getExpertOpinionByPatient(this.expertOpinionId).subscribe({
      next: (dto) => {

        if (!dto) {
          this.currentExpertId = null;
          return;
        }

        this.currentExpertId = dto.id ?? null;

        // ----- патч диагностической формы -----
        this.diagnosisForm.patchValue({
          nameClasses: dto.nameClassesId ?? null,
          diseaseMkb: dto.diseaseMkb ?? null,
          mainDiagnosis: dto.mainDiagnosis ?? '',
          comorbidId: dto.relatedDiseasesId ?? null,
          complications: dto.sequela ?? '',
          justification: dto.validity ?? null,
        }, {emitEvent: false});

        this.pendingMkbId = dto.diseaseMkb != null ? Number(dto.diseaseMkb) : null;
        if (dto.nameClassesId) {
          this.fetchMkb(Number(dto.nameClassesId));
        }

        // ----- патч формы заключения -----
        this.conclusionForm.patchValue({
          groupId: dto.disabilityGroupId ?? null,
          countedFrom: dto.termReceived ? new Date(dto.termReceived) : null,
          termCode: dto.deadlineId ?? null,
          termUntil: dto.disabEstForPeriodTo ? new Date(dto.disabEstForPeriodTo) : null,
          reasonForm7Id: dto.reasonDisabilityAccordForm7 ?? null,
          reasonText: dto.reasonforDisability ?? null,
          uotDegreeId: dto.uotDegree ?? null,
          uotTermCode: dto.deadline2Id ?? null,
          uotCountedTo: dto.uotDegreeSetTo ? new Date(dto.uotDegreeSetTo) : null,
          uotCertificateDate: dto.termUotReceived ? new Date(dto.termUotReceived) : null,
          reexaminationDate: dto.reexaminationDate ? new Date(dto.reexaminationDate) : null
        }, {emitEvent: false});

        this.recommendationForms.patchValue({
          medicalRehabilation: dto.medicalRehabilation ?? null,
          socialRehabilation: dto.socialRehabilation ?? null,
          profRehabilation: dto.profRehabilation ?? null,
          needDynamicMonitoring: dto.dynamicObservationId ?? null,
          socOrProdRecommendationCheckbox: dto.iprSoc ?? null,
          medRecommendationCheckbox: dto.iprMed ?? null,
          // term: dto.deadline3Id ?? null
        }, {emitEvent: false});

        this.updateCheckboxesByGroup(dto.disabilityGroupId ?? null);
        // this.loadLimitationsByGroup(dto.disabilityGroupId ?? null);
        this.conclusionForm.get('uotDegreeId')?.updateValueAndValidity({onlySelf: true});
        this.conclusionForm.updateValueAndValidity({onlySelf: true, emitEvent: false});

        // readonly conclusionForm = this.fb.group({
        //   groupId: [{ value: null, disabled: true}],
        //   temporaryDisabled: [{ value: false, disabled: true}],
        //   countedFrom: [{ value: null, disabled: true}],
        //   termCode: [{ value: null, disabled: true}],
        //   termUntil: [{ value: null, disabled: true}],
        //   reasonForm7Id: [{ value: null, disabled: true}],
        //   reasonText: [{ value: null, disabled: true}],
        //   uotDegreeId: [{ value: null, disabled: true}, [Validators.required, Validators.min(0), Validators.max(100)]],
        //   uotTermCode: [{ value: null, disabled: true}],
        //   uotCountedTo: [{ value: null, disabled: true}],
        //   uotCertificateDate: [{ value: null, disabled: true}],
        //   reexaminationDate: [{ value: null, disabled: true}],
        // }, { validators: [uotByGroupValidator] });

        // ----- UPT (если нужно — FormArray; сейчас берём первый блок) -----
        if (Array.isArray(dto.uptData) && dto.uptData.length) {
          const u = dto.uptData[0];
          this.uptForm.patchValue({
            actNumber: u.aktN1Id ?? '',
            companyName: this.uptForm.value.companyName ?? '',
            bin: this.uptForm.value.bin ?? '',
            uotDegree: u.degreeUpt ?? 0,
            uotCountedFrom: u.degreeOfUptDate ? new Date(u.degreeOfUptDate) : null,
            agreedWithDisabilityTerm: !!u.isAdjudicate,
            uptReasonId: u.causeUptId ?? null,
            uptTermCode: u.deadline2Id ?? null,
            uotUntil: u.termUptDate ? new Date(u.termUptDate) : null,
            uotCertificateRef: u.referenceUpt ?? '',
            // Доп. помощь
            extraHelpEnabled: !!u.isDvp,
            extraHelpNeedText: u.needsAddForms ?? '',
            dvpConclusion: u.conclusionDvp ?? '',
          }, {emitEvent: false});

          if (u.addHelps?.length) {
            u.addHelps.forEach(h => {
              const dic = this.dicHelps.find(d => d.id === h.addHelpId);
              if (dic) this.goalAddHelps[dic.id]?.setValue(true, {emitEvent: false});
            });
          }


        }

        // ----- чекбоксы из health states -----
        // this.patchStates(this.form.controls.goals as FormGroup, dto.justification);
        // this.patchStates(this.formLimitation.controls.goalsLimitation as FormGroup, dto.limitation);
        // this.patchStates(this.formDefects.controls.goalsDefects as FormGroup, dto.defects);
        // this.patchStates(this.irreversibleForm as FormGroup, dto.irreversibleDefects, true);

        this.loadedDto = dto;

        this.tryPatchFromDto();
        this.cdr.markForCheck();
      },
      error: (e) => console.error('loadExisting error', e),
    });
  }


  save(): void {
    const body = this.buildRequest();
    this.isSaving = true;

    const done = () => {
      this.isSaving = false;
      this.cdr.markForCheck();
    };

    const success = () => {
      this.messageService.add({
        severity: 'success',
        summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
        detail: 'Успешно сохранено!',
      });
      done();
    };

    const fail = (e: any) => {
      this.messageService.add({
        severity: 'error',
        summary: this.translationService.instant('COMMON.ERROR'),
        detail: 'Не удалось сохранить!',
      });
      console.error(e);
      done();
    };


    this.camundaService.saveExpertOpinion(this.currentExpertId, body).subscribe({
      next: () => {
        this.camundaService.getExpertOpinionByPatient(this.expertOpinionId).subscribe({
          next: (dto) => {
            this.loadedDto = dto;
            this.tryPatchFromDto();
            success();
          },
          error: (e) => {
            console.error('reload after save error', e);
            this.messageService.add({
              severity: 'warn',
              summary: this.translationService.instant('COMMON.WARNING'),
              detail: 'Сохранено, но не удалось обновить форму.',
            });
            done();
          }
        });
      },
      error: fail,
    });

  }

  private buildRequest(): ExpertOpinionRequest {
    const d = this.diagnosisForm.getRawValue();
    const c = this.conclusionForm.getRawValue();
    const rec = this.recommendationForms.getRawValue();
    const organ = this.organForm.getRawValue();

    // ======== 1) Базовая часть ========
    const body: any = {
      id: this.expertOpinionId ?? null,
      patientId: this.patientId ?? null,

      nameClassesId: d.nameClasses ?? null,
      diseaseMkb: d.diseaseMkb ?? null,
      mainDiagnosis: this.nullIfEmpty(d.mainDiagnosis) ?? null,
      relatedDiseasesId: d.comorbidId ?? null,
      sequela: this.nullIfEmpty(d.complications) ?? null,
      validity: d.justification ?? null,

      disabilityGroupId: c.groupId ?? null,
      termReceived: c.countedFrom ?? null,
      deadlineId: c.termCode ?? null,
      disabEstForPeriodTo: c.termUntil ?? null,
      reasonDisabilityAccordForm7: c.reasonForm7Id ?? null,
      reasonforDisability: this.nullIfEmpty(c.reasonText) ?? null,

      uotDegree: c.uotDegreeId ?? null,
      deadline2Id: c.uotTermCode ?? null,
      termUotReceived: c.uotCertificateDate ?? null,
      uotDegreeSetTo: c.uotCountedTo ?? null,
      reexaminationDate: c.reexaminationDate ?? null,

      // Рекомендации (mapping -> мед/соц/проф + мониторинг)
      medicalRehabilation: rec.medicalRehabilation ?? null,
      socialRehabilation: rec.socialRehabilation ?? null,
      profRehabilation: rec.profRehabilation ?? null,
      dynamicObservationId: rec.needDynamicMonitoring ?? null,
      iprSoc: rec.socOrProdRecommendationCheckbox ?? null,
      iprMed: rec.medRecommendationCheckbox ?? null,

      directionDtos: (this.loadedDto?.directionDtos ?? []).map(x => ({
        directionId: Number(x.directionId)
      })),

      // socOrProdRecommendationCheckbox: this.fb.control(false, Validators.requiredTrue),
      // medRecommendationCheckbox: this.fb.control({ value: false, disabled: true }),
      // needDynamicMonitoring: this.fb.control<number | null>(null, Validators.required),
      // term: this.fb.control<Date | null>(null, Validators.required),
      // deadline3Id — в формах явного поля нет, оставляем null:
      //deadline3Id: rec.term ?? null,

      // Чекбоксы-состояния (как и раньше)
      justification: this.collectStates(this.formJustification.controls.goalsJustification as FormGroup),
      limitation: this.collectStates(this.formLimitation.controls.goalsLimitation as FormGroup),
      defects: this.collectStates(this.formDefects.controls.goalsDefects as FormGroup),
      irreversibleDefects: this.collectStates(this.irreversibleForm as FormGroup, true),

      // UPT (ровно по твоему UptDataDto)
      uptData: [
        this.buildUptDataDto()
      ],

      // Органные дисфункции (4 вложенных DTO из organForm)
      circulation: this.buildCirculationDysDto(organ),
      mental: this.buildMentalDysDto(organ),
      sensor: this.buildSensorDysDto(organ),
      stato: this.buildStatoDysDto(organ),
    };

    return body as ExpertOpinionRequest;
  }

  onGoalChange(directionId: number, checked: boolean): void {
    if (!this.loadedDto) {
      return;
    }

    const directions = this.loadedDto.directionDtos ?? [];

    if (checked) {
      if (!directions.some(x => x.directionId === directionId)) {
        this.loadedDto.directionDtos = [
          ...directions,
          {directionId}
        ];
      }
    } else {
      this.loadedDto.directionDtos = directions.filter(
        x => x.directionId !== directionId
      );
    }

    this.applyExclusiveGoalRules(directionId, checked);
    this.updateDirectionState();
  }

  isGoalChecked(directionId: number): boolean {
    return (this.loadedDto?.directionDtos ?? [])
      .some(x => Number(x.directionId) === directionId);
  }

  private applyExclusiveGoalRules(
    directionId: number,
    checked: boolean
  ): void {
    if (!checked) {
      return;
    }

    this.uncheckOtherGoals(directionId, [801, 802, 803]);
    this.uncheckOtherGoals(directionId, [804, 805]);
    this.uncheckOtherGoals(directionId, [806, 807]);
    this.uncheckOtherGoals(directionId, [810, 811]);
  }

  private uncheckOtherGoals(
    currentId: number,
    group: number[]
  ): void {
    if (!this.loadedDto || !group.includes(currentId)) {
      return;
    }

    this.loadedDto.directionDtos =
      (this.loadedDto.directionDtos ?? []).filter(
        x =>
          Number(x.directionId) === currentId ||
          !group.includes(Number(x.directionId))
      );
  }

  private updateDirectionState(): void {
    const ids = (this.loadedDto?.directionDtos ?? [])
      .map(x => Number(x.directionId));

    this.isDirectionHas =
      ids.some(id => this.directions.includes(id));

    this.isDirectionUotHas =
      ids.some(id => this.directionsUot.includes(id));

    this.isDirectionUptHas =
      ids.some(id => this.directionsUpt.includes(id));

    this.toggle(this.grpDisability, this.isDirectionHas);
    this.toggle(this.grpUot, this.isDirectionUotHas);

    this.conclusionForm.updateValueAndValidity({
      emitEvent: false
    });

    this.cdr.markForCheck();
  }

  private collectStates(group: FormGroup, irrev = false): { healthStateId: number }[] {
    const res: { healthStateId: number }[] = [];
    Object.entries(group.controls).forEach(([k, ctrl]) => {
      if ((ctrl as FormControl<boolean>).value) {
        const id = irrev && k.startsWith('def_') ? Number(k.slice(4)) : Number(k);
        if (Number.isFinite(id)) res.push({healthStateId: id});
      }
    });
    return res;
  }

  private collectAddHelps(group: FormGroup): { addHelpId: number }[] {
    const res: { addHelpId: number }[] = [];
    Object.entries(group.controls).forEach(([code, ctrl]) => {
      if ((ctrl as FormControl<boolean>).value) {
        const dic = this.dicHelps.find(d => String(d.id) === String(code));
        if (dic) res.push({addHelpId: dic.id});
      }
    });
    return res;
  }

  private patchOrganFromDto(dto: ExpertOpinionRequest) {
    if (!dto) return;
    const set = (k: string, v: any) => {
      if (this.organForm.contains(k)) {
        this.organForm.get(k)!.setValue(v ?? (typeof this.organForm.get(k)!.value === 'boolean' ? false : ''));
      }
    };

    // --- Mental ---
    const m = dto.mental;
    if (m) {
      set('b156', m.perceptionId);
      set('b140', m.attentionId);
      set('b144', m.memoryId);
      set('b164', m.thinkingId);
      set('b167', m.speechId);
      set('b152', m.emotionId);
      set('b130', m.willId);
      set('b117', m.intelligenceId);
      set('b110', m.consciousnessId);
      set('b126', m.behaviorId);
      set('b147', m.psychomotorId);
    }

    // --- Sensor ---
    const se = dto.sensor;
    if (se) {
      set('b210', se.visionId);
      set('b230', se.hearingId);
      set('b255', se.smellId);
      set('b265', se.touchId);
      set('b270', se.sensitivityDisordersId);
    }

    // --- Stato (motor / coordination / standing) ---
    const st = dto.stato;
    if (st) {
      // общие (FK на D_LEVEL_RATING)
      set('head', st.motorFunctionsHead);
      set('trunk', st.torso);
      set('limbs', st.limbs);
      set('standing', st.statics);
      set('coord_dynamic', st.coordinationMovements);

      // head*
      set('b710_head', st.headJoint);
      set('b730_head', st.headMuscleStrength);
      set('b755_head', st.headInvoluntaryMotorForce);
      set('b760_head', st.headVoluntaryMotorForce);

      // trunk*
      set('b710_trunk', st.torsoJoint);
      set('b730_trunk', st.torsoMuscleStrength);
      set('b755_trunk', st.torsoInvoluntaryMotorForce);
      set('b760_trunk', st.torsoVoluntaryMotorForce);

      // limbs*
      set('b710_limbs', st.limbsJoint);
      set('b730_limbs', st.limbsMuscleStrength);
      set('b755_limbs', st.limbsInvoluntaryMotorForce);
      set('b760_limbs', st.limbsVoluntaryMotorForce);
      set('', st.limbsVoluntaryMotorForce);

      // coordination*
      set('b735_tone', st.coordinationMuscleTone);
      set('b755_limbs2', st.coordinationInvoluntaryMotorForce);
      set('b760_coord', st.coordinationVoluntaryMotorForce);

      // standing*
      set('standing_b710', st.staticsJoint);
      set('standing_b730', st.staticsMuscleStrength);
      set('standing_b760', st.staticsVoluntaryMotorForce);

      set('s710', st.limbsHeadAndNeckArea);
      set('s720', st.limbsTorso);
      set('s730', st.limbsUpperLimbs);
      set('s750', st.limbsLowerLimbs);
      set('s720b', st.limbsShoulderArea);
      set('s740', st.limbsPelvicArea);

    }

    // --- Circulation / Respiration / Digestion / Excretion / Metabolism / Secretion / Immunity / Other ---
    const c = dto.circulation;
    if (c) {


      // агрегаты и пояснения
      set('circulation', c.impairedCirculatory);
      set('reason_circulation', c.impairedCirculatoryTxt);

      set('b440_resp', c.respiratoryDysfunction);
      set('reason_respiration', c.respiratoryDysTxt);

      // при желании можно показать и «общие» селекты на уровне группы:
      set('reason_excretion', c.allocationDysTxt);

      set('energy', c.dysfunctionMetabolism);
      set('reason_met', c.dysfunctionMetTxt);

      set('secretion', c.dysfunctionInternal);
      set('reason_secretion', c.dysfunctionInternalTxt);

      set('immunity', c.immunityImpairment);
      set('reason_immunity', c.immunityImpairmentTxt);

      set('other_fn', c.additionalInformation);   // был max из двух полей — восстановить ровно одно невозможно
      // set('other_add', c.additionalInformation); // опционально

      set('expert_justify', c.additionalInformationTxt);

      // детализация
      set('b410', c.circulatoryDysHeart);
      set('b415', c.circulatoryDysBloodvVessels);
      set('b420', c.circulatoryDysBloodPressure);
      set('b430', c.circulatoryDysBloodSystem);
      set('b440', c.circulatoryDysBreath);

      set('b515', c.digestiveDysfunction);
      set('b525', c.digestiveDysDefecation);


      set('excretion', c.allocationDysfunction);
      set('b525_ex', c.allocationDysDefecation);
      set('b620', c.allocationDysUrination);

      set('b540', c.metabolismDysGeneralMetabolic);
      set('b555', c.metabolismDysEndocoryneGlands);

      set('b540_1', c.internalSecretionDysGeneralMetabolic);
      set('b555_2', c.internalSecretionDysEndocoryneGlands);

      set('b435', c.immunityImpairmentDysImmunity);
      set('b555_3', c.immunityImpairmentDysEndocoryneGlands);
    }
  }


  private tryPatchFromDto() {
    const dto = this.loadedDto;
    if (!dto) return;

    if (this.dicBriefJustification.length) {
      this.patchByIds(
        this.formJustification.controls.goalsJustification as FormGroup,
        dto.justification
      );
    }

    if (this.dicLimitation.length) {
      this.patchByIds(
        this.formLimitation.controls.goalsLimitation as FormGroup,
        dto.limitation
      );
    }

    if (this.dicDefects.length) {
      this.patchByIds(
        this.formDefects.controls.goalsDefects as FormGroup,
        dto.defects
      );
    }

    // СНАЧАЛА включаем/отключаем дефекты на основе limitation
    if (this.defsReady) {
      this.applyIrreversibleDefectsByLimitations();
    }

    // ПОТОМ патчим выбранные irreversibleDefects
    if (this.defsReady) {
      this.patchIrreversibleById(
        this.irreversibleForm as FormGroup,
        dto.irreversibleDefects
      );
    }

    this.updateDirectionState();
    this.updateFilteredDisabilityGroups();
    this.updateDeadlineByIrreversibleDefectsAndGroup();

    this.patchOrganFromDto(dto);
    this.cdr.markForCheck();
  }

  private patchByIds(group: FormGroup, list?: { healthStateId: number | null }[]) {
    if (!list?.length) return;
    const ids = new Set<number>(list.map(x => Number(x?.healthStateId)).filter(Number.isFinite));
    Object.keys(group.controls).forEach(k => {
      const id = Number(k);
      (group.get(k) as FormControl<boolean>)?.setValue(ids.has(id), {emitEvent: false});
    });
  }


  /** ====== NEW: патч def_<id> ====== */
  private patchIrreversibleById(group: FormGroup, list?: { healthStateId: number | null }[]) {
    if (!group || !list?.length) return;

    const ids = new Set<string>(
      list.filter(x => x?.healthStateId != null).map(x => String(x!.healthStateId))
    );

    Object.keys(group.controls).forEach(k => {
      if (!k.startsWith('def_')) return;

      const idStr = k.slice(4);
      const ctrl = group.get(k) as FormControl<boolean>;
      const val = ids.has(idStr);

      ctrl?.setValue(val, {emitEvent: false});
    });
  }

  private buildStatoDysDto(o: Record<string, any>): StatoDysDto {
    const id = (k: string) => this.toLongOrNull(o[k]);  // FK поля (Long)
    const ii = (k: string) => this.toIntOrNull(o[k]);   // числовые без FK (Integer)

    return {
      // FK (D_LEVEL_RATING)
      motorFunctionsHead: id('head'),
      torso: id('trunk'),
      limbs: id('limbs'),
      statics: id('standing'),
      coordinationMovements: id('coord_dynamic'),

      // head*
      headJoint: ii('b710_head'),
      headMuscleStrength: ii('b730_head'),
      headInvoluntaryMotorForce: ii('b755_head'),
      headVoluntaryMotorForce: ii('b760_head'),

      // torso*
      torsoJoint: ii('b710_trunk'),
      torsoMuscleStrength: ii('b730_trunk'),
      torsoInvoluntaryMotorForce: ii('b755_trunk'),
      torsoVoluntaryMotorForce: ii('b760_trunk'),


      // limbs*
      limbsJoint: ii('b710_limbs'),
      limbsMuscleStrength: ii('b730_limbs'),
      limbsInvoluntaryMotorForce: ii('b755_limbs'),
      limbsVoluntaryMotorForce: ii('b760_limbs'),

      // coordination*
      coordinationMuscleTone: ii('b735_tone'),
      coordinationInvoluntaryMotorForce: ii('b755_limbs2'),
      coordinationVoluntaryMotorForce: ii('b760_coord'),

      // standing*
      staticsJoint: ii('standing_b710'),
      staticsMuscleStrength: ii('standing_b730'),
      staticsVoluntaryMotorForce: ii('standing_b760'),


      // Показатели которых нет в форме — оставляем null:
      limbsMuscleTone: null,
      limbsMotorReflex: null,
      limbsHeadAndNeckArea: ii('s710'),
      limbsTorso: ii('s720'),
      limbsUpperLimbs: ii('s730'),
      limbsLowerLimbs: ii('s750'),
      limbsShoulderArea: ii('s720b'),
      limbsPelvicArea: ii('s740')
    };
  }

  private buildSensorDysDto(o: Record<string, any>): SensorDysDto {
    const id = (k: string) => this.toLongOrNull(o[k]);
    return {
      visionId: id('b210'),
      hearingId: id('b230'),
      smellId: id('b255'),
      touchId: id('b265'),
      sensitivityDisordersId: id('b270'),
    };
  }

  private buildMentalDysDto(o: Record<string, any>): MentalDysDto {
    const id = (k: string) => this.toLongOrNull(o[k]);
    const ii = (k: string) => this.toIntOrNull(o[k]);

    return {
      perceptionId: id('b156'),
      attentionId: id('b140'),
      memoryId: id('b144'),
      // В форме key = b164; на бэке поле называется thinkingId — ок
      thinkingId: id('b164'),
      speechId: id('b167'),
      emotionId: id('b152'),
      willId: id('b130'),
      intelligenceId: id('b117'),
      consciousnessId: id('b110'),
      behaviorId: id('b126'),
      psychomotorId: ii('b147'),
    };

  }

  private buildCirculationDysDto(o: Record<string, any>): CirculationDysDto {
    const v = (k: string) => this.toIntOrNull(o[k]);
    const s = (k: string) => this.nullIfEmpty(o[k]) ?? null;

    // агрегаты (если нет явного общего селекта — берём максимум из детальных)
    const digestiveAgg = this.maxOrNull([v('b515'), v('b525')]);
    const allocationAgg = this.maxOrNull([v('excretion'), v('b525_ex'), v('b620')]); // есть общий excretion
    const metabolismAgg = this.maxOrNull([v('energy'), v('b540'), v('b555')]);       // есть общий energy
    const internalAgg = this.maxOrNull([v('secretion'), v('b540_1'), v('b555_2')]); // общий secretion
    const immunityAgg = this.maxOrNull([v('immunity'), v('b435'), v('b555_3')]);    // общий immunity

    return {
      // агрегаты-флаги/оценки
      impairedCirculatory: v('circulation'),
      impairedCirculatoryTxt: s('reason_circulation'),

      respiratoryDysfunction: v('b440_resp'),
      respiratoryDysTxt: s('reason_respiration'),

      digestiveDysfunction: digestiveAgg,
      digestiveDysTxt: s('reason_digest'),

      allocationDysfunction: allocationAgg,
      allocationDysTxt: s('reason_excretion'),

      dysfunctionMetabolism: metabolismAgg,
      dysfunctionMetTxt: s('reason_met'),

      hematopoieticDysfunction: v('b430'),
      hematopoieticDysTxt: null, // отдельного textarea под кровь нет

      dysfunctionInternal: internalAgg,
      dysfunctionInternalTxt: s('reason_secretion'),

      immunityImpairment: immunityAgg,
      immunityImpairmentTxt: s('reason_immunity'),

      additionalInformation: this.maxOrNull([v('other_fn'), v('other_add')]),
      additionalInformationTxt: s('expert_justify'),

      // детализация (прямые соответствия кодам)
      circulatoryDysHeart: v('b410'),
      circulatoryDysBloodvVessels: v('b415'),
      circulatoryDysBloodPressure: v('b420'),
      circulatoryDysBloodSystem: v('b430'),
      circulatoryDysBreath: v('b440'),

      respiratoryDysBreath: v('b440_resp'),

      digestiveDysDefecation: v('b525'),
      allocationDysDefecation: v('b525_ex'),
      allocationDysUrination: v('b620'),

      metabolismDysGeneralMetabolic: v('b540'),
      metabolismDysEndocoryneGlands: v('b555'),

      internalSecretionDysGeneralMetabolic: v('b540_1'),
      internalSecretionDysEndocoryneGlands: v('b555_2'),

      immunityImpairmentDysImmunity: v('b435'),
      immunityImpairmentDysEndocoryneGlands: v('b555_3'),
    };
  }

  private buildUptDataDto(): UptDataDto {
    const u = this.uptForm.getRawValue();

    return {
      aktN1Id: this.toStr(u.actNumber),
      isAdjudicate: !!u.agreedWithDisabilityTerm,
      referenceUpt: this.toStr(u.uotCertificateRef),
      degreeOfUptDate: this.toIso(u.uotCountedFrom),
      deadline2Id: this.toNum(u.uptTermCode),
      causeUptId: this.toNum(u.uptReasonId),
      termUptDate: this.toIso(u.uotUntil),
      degreeUpt: this.toNum(u.uotDegree),
      isSelected: !!u.agreedWithDisabilityTerm,
      needsAddForms: this.toStr(u.extraHelpNeedText),
      emptyField: null,
      isDvp: !!u.extraHelpEnabled,
      conclusionDvp: this.toStr(u.dvpConclusion),
      addHelps: this.collectAddHelps(this.formAddHelps.controls.goalsAddHelps as FormGroup),
    };
  }


  private nullIfEmpty<T extends string | null | undefined>(v: T): T | null {
    return (v == null || (typeof v === 'string' && v.trim() === '')) ? null : v;
  }

  private toIntOrNull(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  private toLongOrNull(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  private maxOrNull(values: Array<number | null | undefined>): number | null {
    const arr = values.filter((x): x is number => typeof x === 'number' && Number.isFinite(x));
    return arr.length ? Math.max(...arr) : null;
  }

  private toIso(d: Date | string | null | undefined): string | null {
    if (!d) return null;
    const dt = (d instanceof Date) ? d : new Date(d);
    if (Number.isNaN(+dt)) return null;
    return dt.toISOString().slice(0, 10); // yyyy-MM-dd
  }

  private toNum(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  private toStr(v: any): string | null {
    if (v == null) return null;
    const s = String(v).trim();
    return s ? s : null;
  }


  /** трекеры/хелперы для шаблона */
  trackByNode = (_: number, n: DefDisplayNode) => n.item.id;
  trackByLeaf = (_: number, l: DictionaryValue) => l.id;

  toggleDef(n: DefDisplayNode) {
    const curr = {...this.defOpen()};
    curr[n.item.id] = !curr[n.item.id];
    this.defOpen.set(curr);
  }

  leafKey = (id: number | string) => `def_${id}`;


  protected readonly String = String;
}


