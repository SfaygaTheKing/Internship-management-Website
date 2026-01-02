import { Entreprise } from '../entreprise/entreprise';

export class Tuteur {
  public id!: number;
  public numero!: string;
  public qualite!: string;
  public nom!: string;
  public prenom!: string;
  public telephone!: string;
  public entreprise!: Entreprise;
}
