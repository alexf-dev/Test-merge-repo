import {Component, Input} from '@angular/core';
import {CardModule} from "primeng/card";
import {PersonService} from "../../../../core/service/person.service";
import {PersonAddressDto, PersonDocumentDto, PersonHistoryDto} from "../../../../core/model/person-history";

export interface IdentityCardData {
  iin: string;
  fio: string;
  birthDate: string;
  gender: string;
  nationality: string;
  citizenship: string;
  status: string;

  registrationAddress: string;
  registrationStatus: string;
  registrationReason: string;
  birthPlace: string;
  temporaryRegistrationAddress: string;
  registrationDate: string;
  registrationUntil: string;

  birthCertificateNumber: string;
  birthCertificateIssueDate: string;
  birthCertificateOrg: string;

  identityDocumentInfo: string;
  identityDocumentStatus: string;

  passportInfo: string;
  passportStatus: string;
}

@Component({
  selector: 'app-identity-card',
  standalone: true,
  imports: [
    CardModule
  ],
  templateUrl: './identity-card.component.html',
  styleUrl: './identity-card.component.css'
})
export class IdentityCardComponent {
  @Input() historyId!: number;

  data: IdentityCardData | null = null;
  loading = false;

  constructor(
    private personHistoryService: PersonService
  ) {
  }

  ngOnInit(): void {
    if (!this.historyId) {
      return;
    }

    this.loading = true;

    this.personHistoryService.getPersonHistory(this.historyId).subscribe({
      next: (res) => {
        this.data = this.mapToIdentityCardData(res);
        this.loading = false;
      },
      error: (err) => {
        console.error('Ошибка загрузки истории', err);
        this.loading = false;
      }
    });
  }

  private mapToIdentityCardData(person: PersonHistoryDto): IdentityCardData {
    const identityDoc = this.findDocumentByCode(person.documents, '002');
    const passport = this.findDocumentByCode(person.documents, '001');
    const address = person.addresses;

    return {
      iin: person.iin ?? '-',
      fio: this.buildFio(person),
      birthDate: person.birthDate ?? '-',
      gender: person.sex?.nameRu ?? '-',
      nationality: '-',
      citizenship: person.citizenship?.nameRu ?? '-',
      status: person.personStatus?.nameRu ?? '-',

      registrationAddress: this.buildRegistrationAddress(address),
      registrationStatus: address?.addressStatus?.nameRu ?? '-',
      registrationReason: address?.addressStatus?.nameRu ?? '-',
      birthPlace: '-',
      temporaryRegistrationAddress: address?.factAdress ?? '-',
      registrationDate: address?.addressDate ?? '-',
      registrationUntil: address?.addressCloseDate ?? '-',

      birthCertificateNumber: person.birthSvidNumber ?? '-',
      birthCertificateIssueDate: person.birthSvidBeginDate ?? '-',
      birthCertificateOrg: person.birthSvidIssueOrgName ?? '-',

      identityDocumentInfo: this.buildDocumentInfo(identityDoc),
      identityDocumentStatus: identityDoc?.documentInvalidity?.nameRu ?? '-',

      passportInfo: this.buildDocumentInfo(passport),
      passportStatus: passport?.documentInvalidity?.nameRu ?? '-'
    };
  }

  private buildFio(person: PersonHistoryDto): string {
    const fio = [
      person.surname,
      person.firstname,
      person.secondname
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    return fio || '-';
  }

  private findDocumentByCode(
    documents: PersonDocumentDto[] | null | undefined,
    code: string
  ): PersonDocumentDto | undefined {
    return documents?.find(d => d.documentType?.code === code);
  }

  private buildDocumentInfo(doc?: PersonDocumentDto): string {
    if (!doc) {
      return '-';
    }

    const type = doc.documentType?.nameRu ?? 'Документ';
    const number = doc.documentNumber ?? '-';
    const begin = doc.documentBeginDate ?? '-';
    const end = doc.documentEndDate ?? '-';

    return `${type} №${number} с ${begin} по ${end}`;
  }

  private buildRegistrationAddress(address?: PersonAddressDto | null): string {
    if (!address) {
      return '-';
    }

    const parts = [
      address.addressDistricts?.nameRu,
      address.addressRegion?.nameRu,
      address.addressCity?.nameRu,
      address.addressStreet,
      address.addressBuilding ? `д. ${address.addressBuilding}` : null,
      address.addressCorpus ? `корп. ${address.addressCorpus}` : null,
      address.addressFlat ? `кв. ${address.addressFlat}` : null
    ];

    const result = parts.filter(Boolean).join(', ');
    return result || '-';
  }

}
