import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CurriculumwebSharedModule } from 'app/shared';
import {
    CompetenceComponent,
    CompetenceDetailComponent,
    CompetenceUpdateComponent,
    CompetenceDeletePopupComponent,
    CompetenceDeleteDialogComponent,
    competenceRoute,
    competencePopupRoute
} from './';

const ENTITY_STATES = [...competenceRoute, ...competencePopupRoute];

@NgModule({
    imports: [CurriculumwebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompetenceComponent,
        CompetenceDetailComponent,
        CompetenceUpdateComponent,
        CompetenceDeleteDialogComponent,
        CompetenceDeletePopupComponent
    ],
    entryComponents: [CompetenceComponent, CompetenceUpdateComponent, CompetenceDeleteDialogComponent, CompetenceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurriculumwebCompetenceModule {}
