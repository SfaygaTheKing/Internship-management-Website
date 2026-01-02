import { Annee } from '../annee/annee';
import { TypeStage } from '../typeStage/type-stage';

export class DureeStage {
  public id!: number;
  public debut!: Date;
  public fin!: Date;
  public annee!: Annee;
  public typeStage!: TypeStage;
}
