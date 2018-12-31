import { ICompetenceAplication } from 'app/shared/model//competence-aplication.model';

export interface ICompetence {
    id?: number;
    compName?: number;
    compDesc?: string;
    competenceAplication?: ICompetenceAplication;
}

export class Competence implements ICompetence {
    constructor(
        public id?: number,
        public compName?: number,
        public compDesc?: string,
        public competenceAplication?: ICompetenceAplication
    ) {}
}
