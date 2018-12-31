import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';
import { CompetenceAplicationService } from './competence-aplication.service';

@Component({
    selector: 'jhi-competence-aplication-delete-dialog',
    templateUrl: './competence-aplication-delete-dialog.component.html'
})
export class CompetenceAplicationDeleteDialogComponent {
    competenceAplication: ICompetenceAplication;

    constructor(
        protected competenceAplicationService: CompetenceAplicationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.competenceAplicationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'competenceAplicationListModification',
                content: 'Deleted an competenceAplication'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-competence-aplication-delete-popup',
    template: ''
})
export class CompetenceAplicationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ competenceAplication }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompetenceAplicationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.competenceAplication = competenceAplication;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
