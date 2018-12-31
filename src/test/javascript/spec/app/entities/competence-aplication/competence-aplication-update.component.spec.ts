/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CurriculumwebTestModule } from '../../../test.module';
import { CompetenceAplicationUpdateComponent } from 'app/entities/competence-aplication/competence-aplication-update.component';
import { CompetenceAplicationService } from 'app/entities/competence-aplication/competence-aplication.service';
import { CompetenceAplication } from 'app/shared/model/competence-aplication.model';

describe('Component Tests', () => {
    describe('CompetenceAplication Management Update Component', () => {
        let comp: CompetenceAplicationUpdateComponent;
        let fixture: ComponentFixture<CompetenceAplicationUpdateComponent>;
        let service: CompetenceAplicationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CurriculumwebTestModule],
                declarations: [CompetenceAplicationUpdateComponent]
            })
                .overrideTemplate(CompetenceAplicationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompetenceAplicationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompetenceAplicationService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompetenceAplication(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competenceAplication = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompetenceAplication();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.competenceAplication = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
