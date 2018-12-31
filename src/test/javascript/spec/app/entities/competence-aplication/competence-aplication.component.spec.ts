/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CurriculumwebTestModule } from '../../../test.module';
import { CompetenceAplicationComponent } from 'app/entities/competence-aplication/competence-aplication.component';
import { CompetenceAplicationService } from 'app/entities/competence-aplication/competence-aplication.service';
import { CompetenceAplication } from 'app/shared/model/competence-aplication.model';

describe('Component Tests', () => {
    describe('CompetenceAplication Management Component', () => {
        let comp: CompetenceAplicationComponent;
        let fixture: ComponentFixture<CompetenceAplicationComponent>;
        let service: CompetenceAplicationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CurriculumwebTestModule],
                declarations: [CompetenceAplicationComponent],
                providers: []
            })
                .overrideTemplate(CompetenceAplicationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetenceAplicationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetenceAplicationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompetenceAplication(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.competenceAplications[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
