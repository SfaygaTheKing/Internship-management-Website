import { AuthService } from '../../../../controllers/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { ProfesseurService } from '../../../../controllers/professeur/professeur.service';
import { Professeur } from '../../../../models/professeur/professeur';

interface Qualite {
  qualite: string;
}
@Component({
  selector: 'app-profile-professeur',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    CalendarModule,
    DropdownModule,
  ],
  templateUrl: './profile-professeur.component.html',
  styleUrl: './profile-professeur.component.css',
})
export class ProfileProfesseurComponent implements OnInit {
  qualites!: Qualite[];

  dateEmbauche!: Date;
  dateDepart!: Date;

  public password!: string;
  public displayedPassword!: string;
  public passwordChanged!: boolean;

  public validateNumero!: boolean;
  public validateQualite!: boolean;
  public validateNom!: boolean;
  public validatePrenom!: boolean;
  public validateAdresse!: boolean;
  public validateCodePostale!: boolean;
  public validateVille!: boolean;
  public validateTelEcole!: boolean;
  public validateTelDomicile!: boolean;
  public validateDateEmbauche!: boolean;
  public validateEmail!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private professeurService: ProfesseurService
  ) {
    this.qualites = [{ qualite: 'M' }, { qualite: 'Mme' }, { qualite: 'Mlle' }];
  }

  ngOnInit() {
    this.selectedProfesseur = this.authService.retrieveUser()
      .user as Professeur;
    this.password = this.selectedProfesseur.password;
    this.displayedPassword = '';
    this.passwordChanged = false;

    this.validateNumero = true;
    this.validateQualite = true;
    this.validateNom = true;
    this.validatePrenom = true;
    this.validateAdresse = true;
    this.validateCodePostale = true;
    this.validateVille = true;
    this.validateTelEcole = true;
    this.validateTelDomicile = true;
    this.validateDateEmbauche = true;
    this.validateEmail = true;

    this.dateEmbauche = new Date(this.selectedProfesseur.dateEmbauche);
    this.dateDepart = new Date(this.selectedProfesseur.dateDepart);
  }

  update(): void {
    if (this.validateForm()) {
      this.selectedProfesseur.dateEmbauche = this.dateEmbauche;
      this.selectedProfesseur.dateDepart = this.dateDepart;
      if (this.displayedPassword !== '')
        this.selectedProfesseur.password = this.displayedPassword;
      else this.selectedProfesseur.password = this.password;
      if (this.password !== this.selectedProfesseur.password)
        this.passwordChanged = true;
      else this.passwordChanged = false;
      this.professeurService.update(this.passwordChanged).subscribe({
        next: (data) => {
          if (data === 1) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Professeur mis à jour',
              life: 3000,
            });
            this.returnToList();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Échec',
              detail: 'Professeur existe déjà',
              life: 3000,
            });
          }
        },
        error: (e) => console.error(e),
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec',
        detail: 'Veuillez remplir tous les champs obligatoires',
        life: 3000,
      });
    }
  }

  returnToList(): void {
    this.selectedProfesseur = new Professeur();
    this.router.navigate(['stage/list']);
  }

  private validateForm(): boolean {
    let counter = 0;
    if (
      this.selectedProfesseur.numero === undefined ||
      this.selectedProfesseur.numero === null ||
      this.selectedProfesseur.numero === ''
    ) {
      this.validateNumero = false;
      counter++;
    } else this.validateNumero = true;
    if (
      this.selectedProfesseur.qualite === undefined ||
      this.selectedProfesseur.qualite === ''
    ) {
      this.validateQualite = false;
      counter++;
    } else this.validateQualite = true;
    if (
      this.selectedProfesseur.nom === undefined ||
      this.selectedProfesseur.nom === ''
    ) {
      this.validateNom = false;
      counter++;
    } else this.validateNom = true;
    if (
      this.selectedProfesseur.prenom === undefined ||
      this.selectedProfesseur.prenom === ''
    ) {
      this.validatePrenom = false;
      counter++;
    } else this.validatePrenom = true;
    if (
      this.selectedProfesseur.adresse === undefined ||
      this.selectedProfesseur.adresse === ''
    ) {
      this.validateAdresse = false;
      counter++;
    } else this.validateAdresse = true;
    if (
      this.selectedProfesseur.codePostale === undefined ||
      this.selectedProfesseur.codePostale === null ||
      this.selectedProfesseur.codePostale === ''
    ) {
      this.validateCodePostale = false;
      counter++;
    } else this.validateCodePostale = true;
    if (
      this.selectedProfesseur.ville === undefined ||
      this.selectedProfesseur.ville === ''
    ) {
      this.validateVille = false;
      counter++;
    } else this.validateVille = true;
    if (
      this.selectedProfesseur.telEcole === undefined ||
      this.selectedProfesseur.telEcole === null ||
      this.selectedProfesseur.telEcole === ''
    ) {
      this.validateTelEcole = false;
      counter++;
    } else this.validateTelEcole = true;
    if (
      this.selectedProfesseur.telDomicile === undefined ||
      this.selectedProfesseur.telDomicile === null ||
      this.selectedProfesseur.telDomicile === ''
    ) {
      this.validateTelDomicile = false;
      counter++;
    } else this.validateTelDomicile = true;
    if (this.dateEmbauche === undefined) {
      this.validateDateEmbauche = false;
      counter++;
    } else this.validateDateEmbauche = true;
    if (
      this.selectedProfesseur.email === undefined ||
      this.selectedProfesseur.email === ''
    ) {
      this.validateEmail = false;
      counter++;
    } else this.validateEmail = true;
    if (counter === 0) return true;
    else return false;
  }

  public get selectedProfesseur(): Professeur {
    return this.professeurService.selectedProfesseur;
  }
  public set selectedProfesseur(value: Professeur) {
    this.professeurService.selectedProfesseur = value;
  }
}
