import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompetence } from 'app/shared/model/competence.model';
import { CompetenceService } from './competence.service';
import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';
import { CompetenceAplicationService } from 'app/entities/competence-aplication';

@Component({
    selector: 'jhi-competence-update',
    templateUrl: './competence-update.component.html'
})
export class CompetenceUpdateComponent implements OnInit {
    competence: ICompetence;
    isSaving: boolean;

    competenceaplications: ICompetenceAplication[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected competenceService: CompetenceService,
        protected competenceAplicationService: CompetenceAplicationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ competence }) => {
            this.competence = competence;
        });
        this.competenceAplicationService.query().subscribe(
            (res: HttpResponse<ICompetenceAplication[]>) => {
                this.competenceaplications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.competence.id !== undefined) {
            this.subscribeToSaveResponse(this.competenceService.update(this.competence));
        } else {
            this.subscribeToSaveResponse(this.competenceService.create(this.competence));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompetence>>) {
        result.subscribe((res: HttpResponse<ICompetence>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCompetenceAplicationById(index: number, item: ICompetenceAplication) {
        return item.id;
    }
}
