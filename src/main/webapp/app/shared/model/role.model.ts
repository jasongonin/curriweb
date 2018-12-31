import { IExperience } from 'app/shared/model//experience.model';

export interface IRole {
    id?: number;
    roleName?: string;
    roleDescription?: string;
    experience?: IExperience;
}

export class Role implements IRole {
    constructor(public id?: number, public roleName?: string, public roleDescription?: string, public experience?: IExperience) {}
}
