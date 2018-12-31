import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Competence } from 'app/shared/model/competence.model';
import { CompetenceService } from './competence.service';
import { CompetenceComponent } from './competence.component';
import { CompetenceDetailComponent } from './competence-detail.component';
import { CompetenceUpdateComponent } from './competence-update.component';
import { CompetenceDeletePopupComponent } from './competence-delete-dialog.component';
import { ICompetence } from 'app/shared/model/competence.model';

@Injectable({ providedIn: 'root' })
export class CompetenceResolve implements Resolve<ICompetence> {
    constructor(private service: CompetenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Competence> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Competence>) => response.ok),
                map((competence: HttpResponse<Competence>) => competence.body)
            );
        }
        return of(new Competence());
    }
}

export const competenceRoute: Routes = [
    {
        path: 'competence',
        component: CompetenceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'curriculumwebApp.competence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence/:id/view',
        component: CompetenceDetailComponent,
        resolve: {
            competence: CompetenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence/new',
        component: CompetenceUpdateComponent,
        resolve: {
            competence: CompetenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competence.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'competence/:id/edit',
        component: CompetenceUpdateComponent,
        resolve: {
            competence: CompetenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const competencePopupRoute: Routes = [
    {
        path: 'competence/:id/delete',
        component: CompetenceDeletePopupComponent,
        resolve: {
            competence: CompetenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'curriculumwebApp.competence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
