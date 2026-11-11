import {Component, Input, OnInit} from '@angular/core';
import {History} from "../../../core/model/history";
import {PersonDto} from "../../../dto/gbdfl-person-dto";
import {ExpertopinionHistory} from "../../../core/model/expertopinion-history";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../core/api.service";
import {TranslationService} from "../../../core/service/translation.service";
import {AuthService} from "../../../core/service/auth.service";

@Component({
    selector: 'app-absentee-history',
    templateUrl: './absentee-history.component.html',
    styleUrl: './absentee-history.component.css'
})
export class AbsenteeHistoryComponent implements OnInit {
    @Input() expertOpinionId: number | null = null;

    historyList: History[] = [];
    person: PersonDto;

    flattenedData: {
        history: History;
        expertopinion: ExpertopinionHistory;
        firstRow: boolean;
        groupLength: number;
    }[] = [];

    constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, public translateService: TranslationService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.flattenedData = [];
        const id = this.expertOpinionId;
        this.api.get(`/api/history/getDynamicsAppeal/${id}`).pipe(
        ).subscribe(data => {
            this.historyList = data as History[];
            this.flattenData();
        });
    }

    flattenData(): void {
        this.flattenedData = [];

        for (const history of this.historyList) {
            const expertList = history.expertopinionList || [];
            expertList.forEach((eo, index) => {
                this.flattenedData.push({
                    history,
                    expertopinion: eo,
                    firstRow: index === 0,
                    groupLength: expertList.length
                });
            });

        }
    }
}
