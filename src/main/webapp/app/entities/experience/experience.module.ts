import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CurriculumwebSharedModule } from 'app/shared';
import {
    ExperienceComponent,
    ExperienceDetailComponent,
    ExperienceUpdateComponent,
    ExperienceDeletePopupComponent,
    ExperienceDeleteDialogComponent,
    experienceRoute,
    experiencePopupRoute
} from './';

const ENTITY_STATES = [...experienceRoute, ...experiencePopupRoute];

@NgModule({
    imports: [CurriculumwebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExperienceComponent,
        ExperienceDetailComponent,
        ExperienceUpdateComponent,
        ExperienceDeleteDialogComponent,
        ExperienceDeletePopupComponent
    ],
    entryComponents: [ExperienceComponent, ExperienceUpdateComponent, ExperienceDeleteDialogComponent, ExperienceDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurriculumwebExperienceModule {}
