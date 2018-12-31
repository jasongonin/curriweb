import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';
import { AccountService } from 'app/core';
import { CompetenceAplicationService } from './competence-aplication.service';

@Component({
    selector: 'jhi-competence-aplication',
    templateUrl: './competence-aplication.component.html'
})
export class CompetenceAplicationComponent implements OnInit, OnDestroy {
    competenceAplications: ICompetenceAplication[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected competenceAplicationService: CompetenceAplicationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.competenceAplicationService.query().subscribe(
            (res: HttpResponse<ICompetenceAplication[]>) => {
                this.competenceAplications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompetenceAplications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompetenceAplication) {
        return item.id;
    }

    registerChangeInCompetenceAplications() {
        this.eventSubscriber = this.eventManager.subscribe('competenceAplicationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
