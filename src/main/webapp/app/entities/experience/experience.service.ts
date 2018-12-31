import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IExperience } from 'app/shared/model/experience.model';

type EntityResponseType = HttpResponse<IExperience>;
type EntityArrayResponseType = HttpResponse<IExperience[]>;

@Injectable({ providedIn: 'root' })
export class ExperienceService {
    public resourceUrl = SERVER_API_URL + 'api/experiences';

    constructor(protected http: HttpClient) {}

    create(experience: IExperience): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(experience);
        return this.http
            .post<IExperience>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(experience: IExperience): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(experience);
        return this.http
            .put<IExperience>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IExperience>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IExperience[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(experience: IExperience): IExperience {
        const copy: IExperience = Object.assign({}, experience, {
            inicial: experience.inicial != null && experience.inicial.isValid() ? experience.inicial.format(DATE_FORMAT) : null,
            end: experience.end != null && experience.end.isValid() ? experience.end.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.inicial = res.body.inicial != null ? moment(res.body.inicial) : null;
            res.body.end = res.body.end != null ? moment(res.body.end) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((experience: IExperience) => {
                experience.inicial = experience.inicial != null ? moment(experience.inicial) : null;
                experience.end = experience.end != null ? moment(experience.end) : null;
            });
        }
        return res;
    }
}
