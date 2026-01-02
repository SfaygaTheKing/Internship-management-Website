import { User } from '../user/user';

export class Professeur extends User {
  public numero!: string;
  public qualite!: string;
  public nom!: string;
  public prenom!: string;
  public adresse!: string;
  public codePostale!: string;
  public ville!: string;
  public telEcole!: string;
  public telDomicile!: string;
  public dateEmbauche!: Date;
  public dateDepart!: Date;
}
