import { Moment } from 'moment';
import { ICompany } from 'app/shared/model//company.model';
import { IRole } from 'app/shared/model//role.model';
import { ICompetenceAplication } from 'app/shared/model//competence-aplication.model';

export interface IExperience {
    id?: number;
    inicial?: Moment;
    end?: Moment;
    countryName?: string;
    city?: string;
    company?: ICompany;
    companies?: ICompany[];
    roles?: IRole[];
    comptenceAplications?: ICompetenceAplication[];
}

export class Experience implements IExperience {
    constructor(
        public id?: number,
        public inicial?: Moment,
        public end?: Moment,
        public countryName?: string,
        public city?: string,
        public company?: ICompany,
        public companies?: ICompany[],
        public roles?: IRole[],
        public comptenceAplications?: ICompetenceAplication[]
    ) {}
}
