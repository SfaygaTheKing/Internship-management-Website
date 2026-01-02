import { Annee } from '../annee/annee';
import { Entreprise } from '../entreprise/entreprise';
import { Etudiant } from '../etudiant/etudiant';
import { Professeur } from '../professeur/professeur';
import { Tuteur } from '../tuteur/tuteur';
import { TypeStage } from '../typeStage/type-stage';

export class Stage {
  public id!: number;
  public numero!: string;
  public compteRendu!: string;
  public idStage!: string;
  public etudiant!: Etudiant;
  public professeur!: Professeur;
  public tuteur!: Tuteur;
  public entreprise!: Entreprise;
  public typeStage!: TypeStage;
  public annee!: Annee;
}
