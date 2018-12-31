import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CurriculumwebSharedModule } from 'app/shared';
import {
    CompetenceAplicationComponent,
    CompetenceAplicationDetailComponent,
    CompetenceAplicationUpdateComponent,
    CompetenceAplicationDeletePopupComponent,
    CompetenceAplicationDeleteDialogComponent,
    competenceAplicationRoute,
    competenceAplicationPopupRoute
} from './';

const ENTITY_STATES = [...competenceAplicationRoute, ...competenceAplicationPopupRoute];

@NgModule({
    imports: [CurriculumwebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompetenceAplicationComponent,
        CompetenceAplicationDetailComponent,
        CompetenceAplicationUpdateComponent,
        CompetenceAplicationDeleteDialogComponent,
        CompetenceAplicationDeletePopupComponent
    ],
    entryComponents: [
        CompetenceAplicationComponent,
        CompetenceAplicationUpdateComponent,
        CompetenceAplicationDeleteDialogComponent,
        CompetenceAplicationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurriculumwebCompetenceAplicationModule {}
