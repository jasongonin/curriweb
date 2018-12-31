import { IExperience } from 'app/shared/model//experience.model';
import { ICompetence } from 'app/shared/model//competence.model';

export interface ICompetenceAplication {
    id?: number;
    compApliName?: number;
    compApliLevel?: number;
    compApliDesc?: string;
    experience?: IExperience;
    comptences?: ICompetence[];
}

export class CompetenceAplication implements ICompetenceAplication {
    constructor(
        public id?: number,
        public compApliName?: number,
        public compApliLevel?: number,
        public compApliDesc?: string,
        public experience?: IExperience,
        public comptences?: ICompetence[]
    ) {}
}
