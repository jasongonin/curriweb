/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ExperienceService } from 'app/entities/experience/experience.service';
import { IExperience, Experience } from 'app/shared/model/experience.model';

describe('Service Tests', () => {
    describe('Experience Service', () => {
        let injector: TestBed;
        let service: ExperienceService;
        let httpMock: HttpTestingController;
        let elemDefault: IExperience;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ExperienceService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Experience(0, currentDate, currentDate, 'AAAAAAA', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        inicial: currentDate.format(DATE_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Experience', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        inicial: currentDate.format(DATE_FORMAT),
                        end: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        inicial: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Experience(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Experience', async () => {
                const returnedFromService = Object.assign(
                    {
                        inicial: currentDate.format(DATE_FORMAT),
                        end: currentDate.format(DATE_FORMAT),
                        countryName: 'BBBBBB',
                        city: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        inicial: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Experience', async () => {
                const returnedFromService = Object.assign(
                    {
                        inicial: currentDate.format(DATE_FORMAT),
                        end: currentDate.format(DATE_FORMAT),
                        countryName: 'BBBBBB',
                        city: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        inicial: currentDate,
                        end: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Experience', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
