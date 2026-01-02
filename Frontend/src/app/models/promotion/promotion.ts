import { Professeur } from '../professeur/professeur';

export class Promotion {
  public id!: number;
  public annee!: string;
  public nbInscrits!: number;
  public nbRecus!: number;
  public idEtudiant!: number;
  public professeur!: Professeur;
}
