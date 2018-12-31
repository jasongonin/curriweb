import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CurriculumwebExperienceModule } from './experience/experience.module';
import { CurriculumwebCompanyModule } from './company/company.module';
import { CurriculumwebRoleModule } from './role/role.module';
import { CurriculumwebCompetenceModule } from './competence/competence.module';
import { CurriculumwebCompetenceAplicationModule } from './competence-aplication/competence-aplication.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CurriculumwebExperienceModule,
        CurriculumwebCompanyModule,
        CurriculumwebRoleModule,
        CurriculumwebCompetenceModule,
        CurriculumwebCompetenceAplicationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CurriculumwebEntityModule {}
