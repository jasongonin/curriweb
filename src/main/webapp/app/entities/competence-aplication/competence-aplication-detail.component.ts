import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';

@Component({
    selector: 'jhi-competence-aplication-detail',
    templateUrl: './competence-aplication-detail.component.html'
})
export class CompetenceAplicationDetailComponent implements OnInit {
    competenceAplication: ICompetenceAplication;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competenceAplication }) => {
            this.competenceAplication = competenceAplication;
        });
    }

    previousState() {
        window.history.back();
    }
}
