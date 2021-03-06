/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CurriculumwebTestModule } from '../../../test.module';
import { CompetenceDetailComponent } from 'app/entities/competence/competence-detail.component';
import { Competence } from 'app/shared/model/competence.model';

describe('Component Tests', () => {
    describe('Competence Management Detail Component', () => {
        let comp: CompetenceDetailComponent;
        let fixture: ComponentFixture<CompetenceDetailComponent>;
        const route = ({ data: of({ competence: new Competence(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CurriculumwebTestModule],
                declarations: [CompetenceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompetenceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompetenceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.competence).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
