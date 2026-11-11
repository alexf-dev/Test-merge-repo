import {Component, OnInit} from '@angular/core';

interface SignRow {
  patient: string;
  birthDate: Date;
  purpose?: string;
  expertiseStart: Date;
  managerDecision?: string;
  createdAt: Date;
  employee: string;
  status: string;
  iin?: string;
}

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrl: './waiting-list.component.css'
})
export class WaitingListComponent implements OnInit{

  items: SignRow[] = [];
  filteredItems: SignRow[] = [];

  filters: {
    status: string | null;
    dateFrom: Date | null;
    dateTo: Date | null;
    iin: string | null;
  } = {
    status: null,
    dateFrom: null,
    dateTo: null,
    iin: null
  };

  ngOnInit(): void {

    const demoDate = new Date(2002, 11, 9); // 09.12.2002
    this.items = Array.from({length: 14}).map((_, i) => ({
      patient: i === 0
        ? 'Нурманов Галым Шынболатович'
        : 'Ермекова Арайлым Ордалыкызы',
      birthDate: demoDate,
      purpose: '',
      expertiseStart: demoDate,
      managerDecision: '',
      createdAt: demoDate,
      employee: 'Нурманов Галым Шынболатович',
      status: 'new',
      iin: '000000000000'
    }));

    this.filteredItems = [...this.items];

  }


}
