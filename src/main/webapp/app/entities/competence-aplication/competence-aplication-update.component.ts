import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';
import { CompetenceAplicationService } from './competence-aplication.service';
import { IExperience } from 'app/shared/model/experience.model';
import { ExperienceService } from 'app/entities/experience';

@Component({
    selector: 'jhi-competence-aplication-update',
    templateUrl: './competence-aplication-update.component.html'
})
export class CompetenceAplicationUpdateComponent implements OnInit {
    competenceAplication: ICompetenceAplication;
    isSaving: boolean;

    experiences: IExperience[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected competenceAplicationService: CompetenceAplicationService,
        protected experienceService: ExperienceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ competenceAplication }) => {
            this.competenceAplication = competenceAplication;
        });
        this.experienceService.query().subscribe(
            (res: HttpResponse<IExperience[]>) => {
                this.experiences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.competenceAplication.id !== undefined) {
            this.subscribeToSaveResponse(this.competenceAplicationService.update(this.competenceAplication));
        } else {
            this.subscribeToSaveResponse(this.competenceAplicationService.create(this.competenceAplication));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompetenceAplication>>) {
        result.subscribe(
            (res: HttpResponse<ICompetenceAplication>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackExperienceById(index: number, item: IExperience) {
        return item.id;
    }
}
