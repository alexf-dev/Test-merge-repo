import {Component} from '@angular/core';

export type DashboardRole = 'HEAD' | 'OMK_HEAD' | 'OMK_EMPLOYEE' | 'EXPERT' | 'DEPUTY_DIRECTOR' | 'COMMITTEE';

type MetricVariant = 'cyan' | 'yellow' | 'blue' | 'red' | 'green';

type DashboardKind = 'head' | 'omkHead' | 'omkEmployee' | 'expert' | 'deputyDirector' | 'committee';

interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface DashboardUser {
  id: number;
  fullName: string;
  email: string;
  mseCode: string;
  role: DashboardRole;
}

interface MetricCard {
  value: number;
  title: string;
  icon: string;
  variant: MetricVariant;
}

interface SummaryItem {
  title: string;
  count: number;
}

interface SummaryBlock {
  title: string;
  total: number;
  items: SummaryItem[];
}

interface CertificateCase {
  caseNumber: string;
  status: string;
  absentiaDate: string;
  deadline: string;
}

interface ChatCase {
  caseNumber: string;
  region: string;
  statusDate: string;
  responsible: string;
  chatDays: string;
}

interface ReviewCase {
  caseNumber: string;
  expert: string;
  absentiaDate: string;
  waitingDays: string;
}

interface QueueCase {
  recordDate: string;
  receptionDate: string;
  receptionTime: string;
  iin: string;
  mseDepartment: string;
}

interface OverdueCase {
  caseNumber: string;
  expert: string;
  absentiaDate: string;
  overdueDays: string;
}

interface ConsultationCase {
  caseNumber: string;
  sentBy: string;
  days: number;
  purpose: string;
}

interface OverdueAppealCase {
  caseNumber: string;
  appealNumber: string;
  absentiaDate: string;
  deadline: string;
  overdueDays: string;
  responsible: string;
}

interface DeputyMainOverdueCase {
  caseNumber: string;
  absentiaDate: string;
  deadline: string;
  overdueDays: string;
  responsible: string;
}

interface DeputyAppealCase {
  caseNumber: string;
  absentiaDate: string;
  deadline: string;
  responsible: string;
}

interface CommitteeBarItem {
  label: string;
  value: number;
  tone: 'blue' | 'red';
}

interface CommitteeMapMarker {
  value: string;
  top: string;
  left: string;
  tone: 'red' | 'cyan';
}

interface CommitteeTableRow {
  caseNumber: string;
  region: string;
  absentiaDate: string;
  deadline: string;
  overdue: string;
  responsible: string;
  reason: string;
}

type CommitteeTab = 'OVERDUE' | 'WAITING' | 'APPEALS' | 'IIN_MERGE';

interface UserDashboardData {
  kind: DashboardKind;
  metricCards: MetricCard[];
  inPersonSummary?: SummaryBlock;
  absentiaSummary: SummaryBlock;
  consultationAverageDays?: string;
  consultationGaugeValue?: number;
  certificateCases?: CertificateCase[];
  chatCases?: ChatCase[];
  reviewCases: ReviewCase[];
  queueCases?: QueueCase[];
  overdueCases?: OverdueCase[];
  pendingDistributionCases?: CertificateCase[];
  consultationCases?: ConsultationCase[];
  overdueAppealCases?: OverdueAppealCase[];
  deputyMainOverdueCases?: DeputyMainOverdueCase[];
  deputyAppealCases?: DeputyAppealCase[];
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  currentUserId = 8;

  dateRange: Date[] | undefined;
  selectedCaseType: string | null = null;
  selectedStatus: string | null = null;

  committeeActiveTab: CommitteeTab = 'OVERDUE';

  readonly committeeTabs: SelectOption<CommitteeTab>[] = [
    {label: 'Просроченные', value: 'OVERDUE'},
    {label: 'Лист ожидания', value: 'WAITING'},
    {label: 'Обжалования', value: 'APPEALS'},
    {label: 'Объединение ИИН', value: 'IIN_MERGE'}
  ];

  readonly committeeBars: CommitteeBarItem[] = [
    {label: '0–3 дн.', value: 49, tone: 'blue'},
    {label: '4–7 дн.', value: 43, tone: 'blue'},
    {label: '8–14 дн.', value: 32, tone: 'blue'},
    {label: '15+ дн.', value: 24, tone: 'red'}
  ];

  readonly committeeTopRegions: CommitteeMapMarker[] = [
    {value: '1', top: '40%', left: '33%', tone: 'red'},
    {value: '2', top: '28%', left: '57%', tone: 'red'}
  ];

  readonly committeeIinMarkers: CommitteeMapMarker[] = [
    {value: '1', top: '36%', left: '34%', tone: 'cyan'},
    {value: '4', top: '24%', left: '55%', tone: 'cyan'},
    {value: '7', top: '57%', left: '67%', tone: 'cyan'}
  ];

  readonly committeeTableRows: Record<CommitteeTab, CommitteeTableRow[]> = {
    OVERDUE: [
      {
        caseNumber: '2025-39-19',
        region: 'Алматы',
        absentiaDate: '12.04.2024',
        deadline: '10.04.2024',
        overdue: '14 дн.',
        responsible: 'Иванов С.',
        reason: 'Нет заключения'
      },
      {
        caseNumber: '2025-39-19',
        region: 'Алматы',
        absentiaDate: '12.04.2024',
        deadline: '10.04.2024',
        overdue: '14 дн.',
        responsible: 'Иванов С.',
        reason: 'Нет заключения'
      },
      {
        caseNumber: '2025-39-19',
        region: 'Алматы',
        absentiaDate: '12.04.2024',
        deadline: '10.04.2024',
        overdue: '14 дн.',
        responsible: 'Иванов С.',
        reason: 'Нет заключения'
      }
    ],
    WAITING: [
      {
        caseNumber: '2025-39-31',
        region: 'Астана',
        absentiaDate: '15.04.2024',
        deadline: '18.04.2024',
        overdue: '3 дн.',
        responsible: 'Касымова А.',
        reason: 'Ожидание записи'
      },
      {
        caseNumber: '2025-39-32',
        region: 'Шымкент',
        absentiaDate: '16.04.2024',
        deadline: '19.04.2024',
        overdue: '2 дн.',
        responsible: 'Сериков Н.',
        reason: 'Нет свободных слотов'
      },
      {
        caseNumber: '2025-39-33',
        region: 'Караганда',
        absentiaDate: '16.04.2024',
        deadline: '20.04.2024',
        overdue: '1 дн.',
        responsible: 'Иванов С.',
        reason: 'Ожидание подтверждения'
      }
    ],
    APPEALS: [
      {
        caseNumber: '2025-40-01',
        region: 'Алматы',
        absentiaDate: '11.04.2024',
        deadline: '09.04.2024',
        overdue: '12 дн.',
        responsible: 'Турсунов Б.',
        reason: 'Повторное обжалование'
      },
      {
        caseNumber: '2025-40-02',
        region: 'Атырау',
        absentiaDate: '10.04.2024',
        deadline: '08.04.2024',
        overdue: '10 дн.',
        responsible: 'Касымова А.',
        reason: 'Нет решения'
      },
      {
        caseNumber: '2025-40-03',
        region: 'Астана',
        absentiaDate: '09.04.2024',
        deadline: '07.04.2024',
        overdue: '8 дн.',
        responsible: 'Иванов С.',
        reason: 'Требуется разъяснение'
      }
    ],
    IIN_MERGE: [
      {
        caseNumber: '2025-50-01',
        region: 'Павлодар',
        absentiaDate: '13.04.2024',
        deadline: '13.04.2024',
        overdue: '0 дн.',
        responsible: 'Нургалиев Е.',
        reason: 'Дубликат ИИН'
      },
      {
        caseNumber: '2025-50-02',
        region: 'Костанай',
        absentiaDate: '14.04.2024',
        deadline: '14.04.2024',
        overdue: '0 дн.',
        responsible: 'Нургалиев Е.',
        reason: 'Совпадение профилей'
      },
      {
        caseNumber: '2025-50-03',
        region: 'Алматы',
        absentiaDate: '14.04.2024',
        deadline: '14.04.2024',
        overdue: '0 дн.',
        responsible: 'Иванов С.',
        reason: 'Объединение записей'
      }
    ]
  };

  readonly users: DashboardUser[] = [
    {id: 1, fullName: 'Айнур Ахметова', email: 'm@example.com', mseCode: '1294', role: 'HEAD'},
    {id: 2, fullName: 'Мадина Сейсенова', email: 'omk-head@example.com', mseCode: '1294', role: 'OMK_HEAD'},
    {id: 3, fullName: 'Зайцев Н.', email: 'zaitsev@example.com', mseCode: '1661', role: 'EXPERT'},
    {id: 4, fullName: 'Аскаров А.Б.', email: 'askarov@example.com', mseCode: '1662', role: 'EXPERT'},
    {id: 5, fullName: 'Омарова Л.Е.', email: 'omarova@example.com', mseCode: '1663', role: 'EXPERT'},
    {id: 6, fullName: 'Сабирова Г.М.', email: 'omk-employee@example.com', mseCode: '1294', role: 'OMK_EMPLOYEE'},
    {id: 7, fullName: 'Нурланов Д.А.', email: 'deputy@example.com', mseCode: '1294', role: 'DEPUTY_DIRECTOR'},
    {id: 8, fullName: 'Комитет МТСЗН', email: 'committee@example.com', mseCode: '1294', role: 'COMMITTEE'}
  ];

  readonly caseTypes: SelectOption[] = [
    {label: 'Очное освидетельствование', value: 'IN_PERSON'},
    {label: 'Заочное освидетельствование', value: 'ABSENTIA'},
    {label: 'Обжалование', value: 'APPEAL'}
  ];

  readonly statuses: SelectOption[] = [
    {label: 'На утверждении', value: 'APPROVAL'},
    {label: 'На рассмотрении', value: 'REVIEW'},
    {label: 'Ожидает приема', value: 'WAITING'},
    {label: 'Просрочено', value: 'OVERDUE'}
  ];

  readonly dashboards: Record<number, UserDashboardData> = {
    1: {
      kind: 'head',
      metricCards: [
        {value: 12, title: 'На утверждении', icon: 'pi pi-pencil', variant: 'cyan'},
        {value: 41, title: 'Присвоение\nномера справки', icon: 'pi pi-briefcase', variant: 'yellow'},
        {value: 28, title: 'Дела на\nрассмотрении\n(заочка)', icon: 'pi pi-briefcase', variant: 'blue'},
        {value: 18, title: 'Просроченные\nдела (заочка)', icon: 'pi pi-clock', variant: 'red'}
      ],
      inPersonSummary: {
        title: 'Очное освидетельствование',
        total: 12,
        items: [
          {title: 'На утверждении', count: 5},
          {title: 'Ожидает приема по электронной очереди', count: 3}
        ]
      },
      absentiaSummary: {
        title: 'Заочное освидетельствование',
        total: 12,
        items: [
          {title: 'На рассмотрении', count: 5},
          {title: 'Ожидает рассмотрения на чате', count: 3},
          {title: 'Ожидает присвоения номера справки', count: 4}
        ]
      },
      certificateCases: [
        {caseNumber: '2025-39-19', status: 'ожидает присвоен...', absentiaDate: '18.04.2024', deadline: '2 д'},
        {caseNumber: '2025-39-20', status: 'ожидает присвоен...', absentiaDate: '18.04.2024', deadline: '2 д'},
        {caseNumber: '2025-39-21', status: 'ожидает присвоен...', absentiaDate: '18.04.2024', deadline: '2 д'}
      ],
      chatCases: [
        {
          caseNumber: '2025-39-19',
          region: 'Зайцев Н.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        },
        {
          caseNumber: '2025-39-20',
          region: 'Омарова Л.Е.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        },
        {
          caseNumber: '2025-39-21',
          region: 'Иманова Д.С.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        }
      ],
      reviewCases: [
        {caseNumber: '2025-39-19', expert: 'Зайцев Н.', absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-20', expert: 'Омарова Л.Е.', absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-21', expert: 'Иманова Д.С.', absentiaDate: '18.04.2024', waitingDays: '2 дней'}
      ],
      queueCases: [
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '13:45',
          iin: '940202300500',
          mseDepartment: '1661'
        },
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '13:45',
          iin: '940202300501',
          mseDepartment: '1662'
        },
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '13:45',
          iin: '940202300502',
          mseDepartment: '1663'
        }
      ]
    },
    2: this.createOmkHeadDashboard(),
    3: this.createExpertDashboard('Зайцев Н.', 41, 28, 18, ['2 дн.', '5 дн.', '20 дн.'], '1661'),
    4: this.createExpertDashboard('Аскаров А.Б.', 34, 17, 9, ['1 дн.', '4 дн.', '9 дн.'], '1662'),
    5: this.createExpertDashboard('Омарова Л.Е.', 25, 12, 6, ['3 дн.', '6 дн.', '11 дн.'], '1663'),
    6: this.createOmkEmployeeDashboard(),
    7: this.createDeputyDirectorDashboard(),
    8: this.createCommitteeDashboard()
  };

  get currentUser(): DashboardUser {
    return this.users.find((user) => user.id === this.currentUserId) ?? this.users[0];
  }

  get currentRole(): DashboardRole {
    return this.currentUser.role;
  }

  get roleTitle(): string {
    return this.getUserRoleTitle(this.currentRole);
  }

  get dashboard(): UserDashboardData {
    return this.dashboards[this.currentUserId] ?? this.dashboards[1];
  }

  get activeCommitteeRows(): CommitteeTableRow[] {
    return this.committeeTableRows[this.committeeActiveTab];
  }

  getUserRoleTitle(role: DashboardRole): string {
    if (role === 'HEAD') {
      return 'Руководитель';
    }

    if (role === 'OMK_HEAD') {
      return 'Руководитель ОМК';
    }

    if (role === 'OMK_EMPLOYEE') {
      return 'Сотрудник ОМК';
    }

    if (role === 'DEPUTY_DIRECTOR') {
      return 'Заместитель директора';
    }

    if (role === 'COMMITTEE') {
      return 'Комитет';
    }

    return 'Эксперт';
  }

  hasHeadRole(): boolean {
    return this.currentRole === 'HEAD';
  }

  hasOmkHeadRole(): boolean {
    return this.currentRole === 'OMK_HEAD';
  }

  hasOmkEmployeeRole(): boolean {
    return this.currentRole === 'OMK_EMPLOYEE';
  }

  hasExpertRole(): boolean {
    return this.currentRole === 'EXPERT';
  }

  hasDeputyDirectorRole(): boolean {
    return this.currentRole === 'DEPUTY_DIRECTOR';
  }

  hasCommitteeRole(): boolean {
    return this.currentRole === 'COMMITTEE';
  }

  setCommitteeTab(tab: CommitteeTab): void {
    this.committeeActiveTab = tab;
  }

  resetFilters(): void {
    this.dateRange = undefined;
    this.selectedCaseType = null;
    this.selectedStatus = null;
  }

  changeRole(role: DashboardRole): void {
    const user = this.users.find((item) => item.role === role);

    if (user) {
      this.currentUserId = user.id;
    }
  }

  private createOmkHeadDashboard(): UserDashboardData {
    return {
      kind: 'omkHead',
      metricCards: [
        {value: 12, title: 'Приостановление ОМК', icon: 'pi pi-pencil', variant: 'cyan'},
        {value: 41, title: 'На консультации', icon: 'pi pi-briefcase', variant: 'yellow'},
        {value: 28, title: 'Обжалования (заочно)', icon: 'pi pi-briefcase', variant: 'blue'},
        {value: 18, title: 'Просроченные дела (заочно\nобжалования)', icon: 'pi pi-clock', variant: 'red'},
        {value: 28, title: 'На утверждении\nобжалования', icon: 'pi pi-briefcase', variant: 'green'}
      ],
      consultationAverageDays: '~1.9 дня',
      consultationGaugeValue: 32,
      inPersonSummary: {
        title: 'Очное освидетельствование',
        total: 12,
        items: [
          {title: 'Дела направлены на консультацию', count: 5},
          {title: 'Приостановление ОМК', count: 3},
          {title: 'На утверждении', count: 3}
        ]
      },
      absentiaSummary: {
        title: 'Заочное освидетельствование',
        total: 12,
        items: [{title: 'Обжалования заочно', count: 5}]
      },
      reviewCases: [
        {caseNumber: '2025-39-19', expert: 'Зайцев Н.', absentiaDate: '18.04.2024', waitingDays: '3'},
        {caseNumber: '2025-39-20', expert: 'Зайцев Н.', absentiaDate: '18.04.2024', waitingDays: '3'},
        {caseNumber: '2025-39-21', expert: 'Зайцев Н.', absentiaDate: '18.04.2024', waitingDays: '3'}
      ],
      consultationCases: [
        {caseNumber: '2025-39-19', sentBy: 'Зайцев Н.', days: 3, purpose: 'на корректировку'},
        {caseNumber: '2025-39-20', sentBy: 'Зайцев Н.', days: 3, purpose: 'на корректировку'},
        {caseNumber: '2025-39-21', sentBy: 'Зайцев Н.', days: 3, purpose: 'на корректировку'}
      ],
      overdueAppealCases: [
        {
          caseNumber: 'Cell Contents',
          appealNumber: '456',
          absentiaDate: '18.04.2024',
          deadline: '16.04.2024',
          overdueDays: '2 дн.',
          responsible: 'Аскаров А.Б.'
        },
        {
          caseNumber: '2025-39-19',
          appealNumber: '456',
          absentiaDate: '18.04.2024',
          deadline: '16.04.2024',
          overdueDays: '2 дн.',
          responsible: 'Аскаров А.Б.'
        },
        {
          caseNumber: '2025-39-19',
          appealNumber: '456',
          absentiaDate: '18.04.2024',
          deadline: '16.04.2024',
          overdueDays: '2 дн.',
          responsible: 'Аскаров А.Б.'
        }
      ]
    };
  }

  private createOmkEmployeeDashboard(): UserDashboardData {
    return {
      kind: 'omkEmployee',
      metricCards: [
        {value: 28, title: 'Обжалования на рассмотрении (заочно)', icon: 'pi pi-briefcase', variant: 'blue'},
        {value: 18, title: 'Просроченные обжалования (заочно)', icon: 'pi pi-clock', variant: 'red'}
      ],
      absentiaSummary: {
        title: 'Заочное освидетельствование',
        total: 12,
        items: [
          {title: 'На рассмотрении обжалования', count: 5},
          {title: 'Ожидает распределения', count: 3},
          {title: 'Просроченные обжалования', count: 4}
        ]
      },
      pendingDistributionCases: [
        {caseNumber: '2025-39-19', status: 'ожидает распределения', absentiaDate: '18.04.2024', deadline: '18.04.2024'},
        {caseNumber: '2025-39-20', status: 'ожидает распределения', absentiaDate: '18.04.2024', deadline: '18.04.2024'},
        {caseNumber: '2025-39-21', status: 'ожидает распределения', absentiaDate: '18.04.2024', deadline: '18.04.2024'}
      ],
      reviewCases: [
        {caseNumber: '2025-39-19', expert: 'Зайцев Н.', absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-20', expert: 'Омарова Л.Е.', absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-21', expert: 'Иманова Д.С.', absentiaDate: '18.04.2024', waitingDays: '2 дней'}
      ],
      chatCases: [
        {
          caseNumber: '2025-39-19',
          region: 'Зайцев Н.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        },
        {
          caseNumber: '2025-39-20',
          region: 'Омарова Л.Е.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        },
        {
          caseNumber: '2025-39-21',
          region: 'Иманова Д.С.',
          statusDate: '18.04.2024',
          responsible: 'Аскаров А.Б.',
          chatDays: '2 дней'
        }
      ]
    };
  }

  private createExpertDashboard(
    expert: string,
    waitingQueue: number,
    reviewCount: number,
    overdueCount: number,
    overdueDays: string[],
    mseDepartment: string
  ): UserDashboardData {
    return {
      kind: 'expert',
      metricCards: [
        {value: waitingQueue, title: 'Ожидает приема по\nэлектронной', icon: 'pi pi-briefcase', variant: 'yellow'},
        {value: reviewCount, title: 'Дела на рассмотрении\n(заочка)', icon: 'pi pi-briefcase', variant: 'blue'},
        {value: overdueCount, title: 'Просроченные дела\n(заочка)', icon: 'pi pi-clock', variant: 'red'}
      ],
      absentiaSummary: {
        title: 'Заочное освидетельствование',
        total: 12,
        items: [
          {title: 'На рассмотрении', count: 5},
          {title: 'На рассмотрении и просроченные', count: 3},
          {title: 'Ожидает присвоения номера справки', count: 4}
        ]
      },
      reviewCases: [
        {caseNumber: '2025-39-19', expert, absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-20', expert, absentiaDate: '18.04.2024', waitingDays: '2 дней'},
        {caseNumber: '2025-39-21', expert, absentiaDate: '18.04.2024', waitingDays: '2 дней'}
      ],
      overdueCases: [
        {caseNumber: '2025-39-19', expert, absentiaDate: '18.04.2024', overdueDays: overdueDays[0]},
        {caseNumber: '2025-39-20', expert, absentiaDate: '18.04.2024', overdueDays: overdueDays[1]},
        {caseNumber: '2025-39-21', expert, absentiaDate: '18.04.2024', overdueDays: overdueDays[2]}
      ],
      queueCases: [
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '13:45',
          iin: '940202300500',
          mseDepartment
        },
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '14:00',
          iin: '940202300501',
          mseDepartment
        },
        {
          recordDate: '31.03.2026',
          receptionDate: '02.04.2026',
          receptionTime: '14:15',
          iin: '940202300502',
          mseDepartment
        }
      ]
    };
  }

  private createDeputyDirectorDashboard(): UserDashboardData {
    return {
      kind: 'deputyDirector',
      metricCards: [
        {value: 12, title: 'Лист ожидания', icon: 'pi pi-pencil', variant: 'cyan'},
        {value: 41, title: 'Кол-во записей по\nэлектронной', icon: 'pi pi-briefcase', variant: 'yellow'},
        {value: 28, title: 'Просроченные\nдела\n(обжалования,\nзаочно)', icon: 'pi pi-briefcase', variant: 'blue'},
        {value: 18, title: 'Просроченные\nдела (заочно)', icon: 'pi pi-clock', variant: 'red'}
      ],
      consultationAverageDays: '80% заявок за 7 дней',
      consultationGaugeValue: 62,
      inPersonSummary: {
        title: 'Очное освидетельствование',
        total: 12,
        items: [
          {title: 'Лист ожидания', count: 5},
          {title: 'Просроченные дела', count: 3},
          {title: 'Просроченные дела обжалования', count: 3}
        ]
      },
      absentiaSummary: {
        title: 'Очное освидетельствование',
        total: 12,
        items: []
      },
      reviewCases: [],
      deputyMainOverdueCases: [
        {
          caseNumber: '2025-39-19',
          absentiaDate: '18.04.2023',
          deadline: '18.04.2024',
          overdueDays: '2 дн',
          responsible: 'Аскаров А.Б.'
        },
        {
          caseNumber: '2025-39-19',
          absentiaDate: '18.04.2023',
          deadline: '18.04.2024',
          overdueDays: '2 дн',
          responsible: 'Аскаров А.Б.'
        },
        {
          caseNumber: '2025-39-19',
          absentiaDate: '18.04.2023',
          deadline: '18.04.2024',
          overdueDays: '2 дн',
          responsible: 'Аскаров А.Б.'
        }
      ],
      deputyAppealCases: [
        {caseNumber: '2025-39-19', absentiaDate: '18.04.2023', deadline: '18.04.2024', responsible: 'Аскаров А.Б.'},
        {caseNumber: '2025-39-19', absentiaDate: '18.04.2023', deadline: '18.04.2024', responsible: 'Аскаров А.Б.'},
        {caseNumber: '2025-39-19', absentiaDate: '18.04.2023', deadline: '18.04.2024', responsible: 'Аскаров А.Б.'}
      ]
    };
  }

  private createCommitteeDashboard(): UserDashboardData {
    return {
      kind: 'committee',
      metricCards: [
        {value: 12, title: 'Просрочено в заочке', icon: 'pi pi-pencil', variant: 'cyan'},
        {value: 41, title: 'В ожидании', icon: 'pi pi-briefcase', variant: 'yellow'},
        {value: 18, title: 'Обжалования в заочке', icon: 'pi pi-clock', variant: 'red'},
        {value: 28, title: 'На утверждении обжалования', icon: 'pi pi-briefcase', variant: 'green'}
      ],
      absentiaSummary: {title: 'Комитет', total: 0, items: []},
      reviewCases: []
    };
  }
}
