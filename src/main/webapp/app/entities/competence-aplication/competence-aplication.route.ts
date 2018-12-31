import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CompetenceAplication } from 'app/shared/model/competence-aplication.model';
import { CompetenceAplicationService } from './competence-aplication.service';
import { CompetenceAplicationComponent } from './competence-aplication.component';
import { CompetenceAplicationDetailComponent } from './competence-aplication-detail.component';
import { CompetenceAplicationUpdateComponent } from './competence-aplication-update.component';
import { CompetenceAplicationDeletePopupComponent } from './competence-aplication-delete-dialog.component';
import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';

@Injectable({ providedIn: 'root' })
export class CompetenceAplicationResolve implements Resolve<ICompetenceAplication> {
    constructor(private service: CompetenceAplicationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CompetenceAplication> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<CompetenceAplication>) => response.ok),
                map((competenceAplication: HttpResponse<CompetenceAplication>) => competenceAplication.body)
            );
        }
        return of(new CompetenceAplication());
    }
}

export const competenceAplicationRoute: Routes = [
    {
        path: 'competence-aplication',
        component: CompetenceAplicationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competenceAplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence-aplication/:id/view',
        component: CompetenceAplicationDetailComponent,
        resolve: {
            competenceAplication: CompetenceAplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competenceAplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence-aplication/new',
        component: CompetenceAplicationUpdateComponent,
        resolve: {
            competenceAplication: CompetenceAplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competenceAplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence-aplication/:id/edit',
        component: CompetenceAplicationUpdateComponent,
        resolve: {
            competenceAplication: CompetenceAplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competenceAplication.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const competenceAplicationPopupRoute: Routes = [
    {
        path: 'competence-aplication/:id/delete',
        component: CompetenceAplicationDeletePopupComponent,
        resolve: {
            competenceAplication: CompetenceAplicationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competenceAplication.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
