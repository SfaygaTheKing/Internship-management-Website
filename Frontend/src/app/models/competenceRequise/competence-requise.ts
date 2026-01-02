import { Competence } from '../competence/competence';
import { TypeStage } from '../typeStage/type-stage';

export class CompetenceRequise {
  public id!: number;
  public niveau!: number;
  public competence!: Competence;
  public typeStage!: TypeStage;
}
