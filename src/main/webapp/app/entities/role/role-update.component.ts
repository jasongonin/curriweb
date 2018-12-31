import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRole } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IExperience } from 'app/shared/model/experience.model';
import { ExperienceService } from 'app/entities/experience';

@Component({
    selector: 'jhi-role-update',
    templateUrl: './role-update.component.html'
})
export class RoleUpdateComponent implements OnInit {
    role: IRole;
    isSaving: boolean;

    experiences: IExperience[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected roleService: RoleService,
        protected experienceService: ExperienceService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ role }) => {
            this.role = role;
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
        if (this.role.id !== undefined) {
            this.subscribeToSaveResponse(this.roleService.update(this.role));
        } else {
            this.subscribeToSaveResponse(this.roleService.create(this.role));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>) {
        result.subscribe((res: HttpResponse<IRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
