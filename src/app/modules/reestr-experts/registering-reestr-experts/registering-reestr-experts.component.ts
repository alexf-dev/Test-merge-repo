import {Component, OnInit} from '@angular/core';
import {DictionaryValue} from "../../../core/model/dictionary-value";
import {DictionaryService} from "../../../core/service/dictionary.service";
import {NosologyTreeDto} from "../../../dto/dictionary/nosology-tree-dto";
import {MseDto} from "../../../dto/mse-dto";
import {CreateReestrExpertDto} from "../../../dto/reestrExperts/create-reestr-expert-dto";
import {CamundaService} from "../../../core/service/camunda.service";
import {MessageService} from "primeng/api";
import {TranslationService} from "../../../core/service/translation.service";

@Component({
  selector: 'app-registering-reestr-experts',
  templateUrl: './registering-reestr-experts.component.html',
  styleUrl: './registering-reestr-experts.component.css'
})
export class RegisteringReestrExpertsComponent implements OnInit {

  dicRegion: DictionaryValue[] = [];
  dicAgeGroup: DictionaryValue[] = [];
  dicOmik: DictionaryValue[] = [];
  dicPost: DictionaryValue[] = [];
  dicMse: MseDto[] = [];
  createReestrExpert: CreateReestrExpertDto = new CreateReestrExpertDto();

  isSaved: boolean = false;

  mkbList: NosologyTreeDto[] = [];
  filteredMkbList: NosologyTreeDto[] = [];
  mkbSearch = '';

  constructor(
    private dictionaryService: DictionaryService,
    private camundaService: CamundaService,
    private messageService: MessageService,
    private translationService: TranslationService
  ) {
  }

  ngOnInit(): void {
    this.dictionaryService.loadRegion('D_REGION').subscribe(res => {
      this.dicRegion = res;

      if (this.dicRegion.length === 1) {
          this.createReestrExpert.region = this.dicRegion[0].id;
      }
    });

    this.dictionaryService.load(125, 'Z_D_CATEGORY').subscribe(res => {
      this.dicAgeGroup = res;
    });

    this.dictionaryService.load(139, 'D_OMIK').subscribe(res => {
      this.dicOmik = res;
    });

    this.dictionaryService.load(140, 'D_POST_ID').subscribe(res => {
      this.dicPost = res;
    });

    this.loadMkbTree();
    this.loadMSe();
  }

  sendToCommittee(): void {
    const mkbIds = this.mkbList
      .filter(parent => parent.checked)
      .flatMap(parent => parent.children.map(child => child.id));

    const request = {
      ...this.createReestrExpert,
      dateOfEmployment: this.createReestrExpert.dateOfEmployment ? this.toDateOnly(this.createReestrExpert.dateOfEmployment as Date) : null,
      mkbs: [...new Set(mkbIds)].map(id => ({
        mkbId: id
      }))
    };


    this.camundaService.saveReestrExpert(request).subscribe({
      next: () => {
        this.isSaved = true;

        this.messageService.add({
          severity: 'success',
          summary: this.translationService.instant('COMMON.SUCCESSFULLY_SAVED'),
          detail: 'Сохранено',
        });
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.translationService.instant('COMMON.ERROR'),
          detail: err.message || err,
        });
      }
    });

  }

  loadMkbTree(): void {

    this.dictionaryService.getMkbTree("DIC_MKB").subscribe({
      next: (res) => {
        this.mkbList = res.map(parent => ({
          ...parent,
          checked: false,
          expanded: false,
          children: parent.children?.map(child => ({
            ...child,
            checked: false
          })) || []
        }));
        this.filteredMkbList = [...this.mkbList];
      }
    });
  }

  loadMSe(): void {
      this.dictionaryService.getMse().subscribe(res => {
        this.dicMse = res;
      });
  }

  filterMkb(): void {
    const search = this.mkbSearch.trim().toLowerCase();

    if (!search) {
      this.filteredMkbList = this.mkbList;
      return;
    }

    this.filteredMkbList = this.mkbList
      .map(parent => {
        const parentMatch = parent.name?.toLowerCase().includes(search);
        const filteredChildren = parent.children?.filter(child =>
          child.name?.toLowerCase().includes(search)
        ) || [];

        if (parentMatch || filteredChildren.length) {
          return {
            ...parent,
            expanded: true,
            children: parentMatch ? parent.children : filteredChildren
          };
        }

        return null;
      })
      .filter((item) => item  !== null) as NosologyTreeDto[];
  }


  toggleParent(parent: NosologyTreeDto): void {
    parent.expanded = !parent.expanded;
  }

  trackById(index: number, item: any): any {
    return item.id ?? index;
  }

  private toDateOnly(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
