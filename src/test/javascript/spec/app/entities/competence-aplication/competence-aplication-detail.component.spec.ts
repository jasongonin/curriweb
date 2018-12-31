/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CurriculumwebTestModule } from '../../../test.module';
import { CompetenceAplicationDetailComponent } from 'app/entities/competence-aplication/competence-aplication-detail.component';
import { CompetenceAplication } from 'app/shared/model/competence-aplication.model';

describe('Component Tests', () => {
    describe('CompetenceAplication Management Detail Component', () => {
        let comp: CompetenceAplicationDetailComponent;
        let fixture: ComponentFixture<CompetenceAplicationDetailComponent>;
        const route = ({ data: of({ competenceAplication: new CompetenceAplication(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CurriculumwebTestModule],
                declarations: [CompetenceAplicationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CompetenceAplicationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompetenceAplicationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.competenceAplication).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
