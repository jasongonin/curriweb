import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompetenceAplication } from 'app/shared/model/competence-aplication.model';

type EntityResponseType = HttpResponse<ICompetenceAplication>;
type EntityArrayResponseType = HttpResponse<ICompetenceAplication[]>;

@Injectable({ providedIn: 'root' })
export class CompetenceAplicationService {
    public resourceUrl = SERVER_API_URL + 'api/competence-aplications';

    constructor(protected http: HttpClient) {}

    create(competenceAplication: ICompetenceAplication): Observable<EntityResponseType> {
        return this.http.post<ICompetenceAplication>(this.resourceUrl, competenceAplication, { observe: 'response' });
    }

    update(competenceAplication: ICompetenceAplication): Observable<EntityResponseType> {
        return this.http.put<ICompetenceAplication>(this.resourceUrl, competenceAplication, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICompetenceAplication>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICompetenceAplication[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
