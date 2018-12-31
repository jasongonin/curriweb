import { IExperience } from 'app/shared/model//experience.model';

export interface ICompany {
    id?: number;
    companyName?: string;
    companyDescription?: string;
    experience?: IExperience;
}

export class Company implements ICompany {
    constructor(public id?: number, public companyName?: string, public companyDescription?: string, public experience?: IExperience) {}
}
