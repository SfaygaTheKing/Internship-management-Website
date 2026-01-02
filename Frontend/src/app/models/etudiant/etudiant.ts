import { Promotion } from '../promotion/promotion';

export class Etudiant {
  public id!: number;
  public numero!: string;
  public qualite!: string;
  public nom!: string;
  public prenom!: string;
  public adresse!: string;
  public codePostale!: string;
  public ville!: string;
  public sexe!: string;
  public dateNaissance!: Date;
  public telephone!: string;
  public mention!: string;
  public promotion!: Promotion;
}
