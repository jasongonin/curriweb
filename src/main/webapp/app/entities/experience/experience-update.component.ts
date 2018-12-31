import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IExperience } from 'app/shared/model/experience.model';
import { ExperienceService } from './experience.service';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company';

@Component({
    selector: 'jhi-experience-update',
    templateUrl: './experience-update.component.html'
})
export class ExperienceUpdateComponent implements OnInit {
    experience: IExperience;
    isSaving: boolean;

    companies: ICompany[];
    inicialDp: any;
    endDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected experienceService: ExperienceService,
        protected companyService: CompanyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ experience }) => {
            this.experience = experience;
        });
        this.companyService.query({ filter: 'experience-is-null' }).subscribe(
            (res: HttpResponse<ICompany[]>) => {
                if (!this.experience.company || !this.experience.company.id) {
                    this.companies = res.body;
                } else {
                    this.companyService.find(this.experience.company.id).subscribe(
                        (subRes: HttpResponse<ICompany>) => {
                            this.companies = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.experience.id !== undefined) {
            this.subscribeToSaveResponse(this.experienceService.update(this.experience));
        } else {
            this.subscribeToSaveResponse(this.experienceService.create(this.experience));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperience>>) {
        result.subscribe((res: HttpResponse<IExperience>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCompanyById(index: number, item: ICompany) {
        return item.id;
    }
}
