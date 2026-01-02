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
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProfesseurService } from '../../../controllers/professeur/professeur.service';
import { Professeur } from '../../../models/professeur/professeur';

interface Qualite {
  qualite: string;
}

@Component({
  selector: 'app-professeur-create',
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
  templateUrl: './professeur-create.component.html',
  styleUrl: './professeur-create.component.css',
})
export class ProfesseurCreateComponent implements OnInit {
  qualites!: Qualite[];

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
  public validatePassword!: boolean;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private professeurService: ProfesseurService
  ) {
    this.qualites = [{ qualite: 'M' }, { qualite: 'Mme' }, { qualite: 'Mlle' }];
  }

  ngOnInit() {
    this.selectedProfesseur = new Professeur();

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
    this.validatePassword = true;
  }

  save(): void {
    if (this.validateForm()) {
      this.professeurService.save().subscribe({
        next: (data) => {
          if (data !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Professeur enregistrée',
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
    this.router.navigate(['professeur/list']);
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
    if (this.selectedProfesseur.dateEmbauche === undefined) {
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
    if (
      this.selectedProfesseur.password === undefined ||
      this.selectedProfesseur.password === ''
    ) {
      this.validatePassword = false;
      counter++;
    } else this.validatePassword = true;
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
